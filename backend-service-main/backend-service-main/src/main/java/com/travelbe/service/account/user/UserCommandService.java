package com.travelbe.service.account.user;

import com.travelbe.config.exception.ConflictException;
import com.travelbe.config.exception.RequestInvalidException;
import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.controller.pub.auth.models.ForgotPasswordForm;
import com.travelbe.controller.pub.auth.models.RegisterForm;
import com.travelbe.controller.pub.residence.models.RoomInfo;
import com.travelbe.controller.user_me.models.booking.BookingDetailRequest;
import com.travelbe.controller.user_me.models.booking.BookingRequest;
import com.travelbe.controller.user_me.models.UpdatePassword;
import com.travelbe.controller.user_me.models.UserUpdate;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.account.user.UserRepository;
import com.travelbe.database.sql.hotel.booking.BookingEntity;
import com.travelbe.database.sql.hotel.booking.BookingRepository;
import com.travelbe.database.sql.hotel.booking_detail.BookingDetailEntity;
import com.travelbe.database.sql.hotel.booking_detail.BookingDetailRepository;
import com.travelbe.database.sql.hotel.profit.ProfitEntity;
import com.travelbe.database.sql.hotel.profit.ProfitRepository;
import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type.RoomTypeRepository;
import com.travelbe.dto.account.user.UserMapper;
import com.travelbe.dto.hotel.room_type.RoomTypeMapper;
import com.travelbe.model.DateRange;
import com.travelbe.model.enums.EBookingStatus;
import com.travelbe.model.enums.EProfit;
import com.travelbe.model.enums.EStatus;
import com.travelbe.util.AuthenticationCurrent;
import com.travelbe.util.Const;
import com.travelbe.util.EmailUtil;
import com.travelbe.util.JwtUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserCommandService {

    @NonNull final UserRepository userRepository;
    @NonNull final RoomTypeRepository roomTypeRepository;
    @NonNull final ProfitRepository profitRepository;
    @NonNull final BookingRepository bookingRepository;
    @NonNull final BookingDetailRepository bookingDetailRepository;
    @NonNull final PasswordEncoder passwordEncoder;
    @NonNull final JwtUtil jwtUtil;
    @NonNull final AuthenticationCurrent authCurrent;
    @NonNull final UserMapper userMapper;
    @NonNull final RoomTypeMapper roomTypeMapper;

    public void register(RegisterForm registerForm) {
        if(userRepository.findByEmail(registerForm.email()).isPresent()) {
            throw new ConflictException("Email này đã được đăng ký.");
        }
        UserEntity newUser = userMapper.toEntity(registerForm,
                                                 passwordEncoder.encode(registerForm.password()),
                                                 EStatus.ACTIVE, Const.AVATAR);
        userRepository.save(newUser);
    }

    public void forgotPassword(ForgotPasswordForm forgotPasswordForm) {
        String email = jwtUtil.getValueForgotToken(forgotPasswordForm.token());
        if(Objects.isNull(email))
            throw new RequestInvalidException("Link không hợp lệ, vui lòng thử lại !!!");

        UserEntity foundUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email chưa được đăng ký"));
        foundUser.setPassword(passwordEncoder.encode(forgotPasswordForm.newPassword()));
        userRepository.save(foundUser);
    }

    public void updateMe(UserUpdate user) {
        UserEntity foundUser = authCurrent.getUser();
        userMapper.updateEntity(user, foundUser);
        userRepository.save(foundUser);
    }

    public void changePassword(UpdatePassword password) {
        UserEntity foundUser = authCurrent.getUser();
        if(!passwordEncoder.matches(password.oldPassword(), foundUser.getPassword()))
            throw new RequestInvalidException("Mật khẩu cũ không đúng.");
        foundUser.setPassword(passwordEncoder.encode(password.confirmPassword()));
        userRepository.save(foundUser);
    }

    public void booking(BookingRequest booking) {
        if(booking.checkin().isAfter(booking.checkout()) || booking.checkin().isBefore(LocalDate.now())) {
            throw new RequestInvalidException("Vui lòng chọn ngày !!");
        }
        ProfitEntity foundProfit = profitRepository.findFirstByProfitTypeOrderByCreatedAtDesc(EProfit.APP)
                .orElseThrow(ResourceNotFoundException::new);
        List<RoomInfo> foundRoom = roomTypeRepository
                .findAllByResidenceId(booking.residenceId(), new DateRange(booking.checkin(), booking.checkout()))
                .stream().map(data -> roomTypeMapper.toDto((RoomTypeEntity) data[0],(Integer) data[1]))
                .map(xx -> {
                    for (BookingDetailRequest bd : booking.bookingDetail()) {
                        if(bd.roomTypeId().equals(xx.roomTypeId()) && xx.quantity() < bd.quantity())
                            throw new ConflictException("Số phòng hiện tại không đủ, vui lòng thử lại !!");
                        if(bd.roomTypeId().equals(xx.roomTypeId()))
                            return xx.updateQuantity(bd.quantity());
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .toList();

        BookingEntity newBooking = BookingEntity.builder()
                .userId(authCurrent.getUser().getUserId()).residenceId(booking.residenceId())
                .profitId(foundProfit.getProfitId()).name(booking.name()).phone(booking.phone())
                .checkin(booking.checkin()).checkout(booking.checkout()).paid(false)
                .status(EBookingStatus.PENDING).reviewed(false).note(booking.note())
                .createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now())
                .build();
        bookingRepository.save(newBooking);
        bookingDetailRepository.saveAll(
                foundRoom.stream().map(xx -> BookingDetailEntity.builder()
                         .bookingId(newBooking.getBookingId()).roomTypeId(xx.roomTypeId())
                         .price(xx.price()).quantity(xx.quantity()).build())
                         .toList());
    }
}
