package com.travelbe.service.account.user;

import com.aspose.words.Document;
import com.aspose.words.PdfCompliance;
import com.aspose.words.PdfSaveOptions;
import com.aspose.words.ReportingEngine;
import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.config.exception.UnauthorizedException;
import com.travelbe.controller.pub.auth.models.Email;
import com.travelbe.controller.pub.auth.models.LoginForm;
import com.travelbe.controller.pub.auth.models.RefreshToken;
import com.travelbe.controller.pub.auth.models.TokenResponse;
import com.travelbe.controller.user_me.models.booking.BookingDetailResponse;
import com.travelbe.controller.user_me.models.booking.BookingResponse;
import com.travelbe.controller.user_me.models.DropdownMe;
import com.travelbe.controller.user_me.models.UserResponse;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.account.user.UserRepository;
import com.travelbe.database.sql.hotel.booking.BookingEntity;
import com.travelbe.database.sql.hotel.booking.BookingRepository;
import com.travelbe.database.sql.hotel.booking_detail.BookingDetailEntity;
import com.travelbe.database.sql.hotel.booking_detail.BookingDetailRepository;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.residence.ResidenceRepository;
import com.travelbe.database.sql.hotel.review.ReviewEntity;
import com.travelbe.database.sql.roles.permission_group.PermissionGroupEntity;
import com.travelbe.database.sql.roles.user_group.UserGroupRepository;
import com.travelbe.dto.account.user.UserMapper;
import com.travelbe.dto.hotel.booking.Booking;
import com.travelbe.dto.hotel.booking.BookingMapper;
import com.travelbe.dto.hotel.booking_detail.BookingDetail;
import com.travelbe.dto.hotel.booking_detail.BookingDetailMapper;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.enums.EStatus;
import com.travelbe.util.AuthenticationCurrent;
import com.travelbe.util.EmailUtil;
import com.travelbe.util.JwtUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserQueryService {

    @NonNull final UserRepository userRepository;
    @NonNull final PasswordEncoder passwordEncoder;
    @NonNull final JwtUtil jwtUtil;
    @NonNull final EmailUtil emailUtil;
    @NonNull final AuthenticationCurrent authCurrent;
    @NonNull final UserMapper userMapper;
    @NonNull final UserGroupRepository userGroupRepository;
    @NonNull final BookingRepository bookingRepository;
    @NonNull final BookingMapper bookingMapper;
    @NonNull final BookingDetailMapper bookingDetailMapper;
    @NonNull final BookingDetailRepository bookingDetailRepository;
    @NonNull final ResidenceRepository residenceRepository;

    public TokenResponse login(LoginForm loginForm) {
        UserEntity foundUser = userRepository.findByEmailAndStatus(loginForm.email(), EStatus.ACTIVE)
                                            .orElseThrow(ResourceNotFoundException::new);
        if(!passwordEncoder.matches(loginForm.password(), foundUser.getPassword())) throw new ResourceNotFoundException();
        return TokenResponse.builder()
                            .accessToken(jwtUtil.generateAccessToken(foundUser.getUserId()))
                            .refreshToken(jwtUtil.generateRefreshToken(foundUser.getUserId()))
                            .build();
    }

    public TokenResponse refreshToken(RefreshToken refreshToken) {
        if(Objects.isNull(refreshToken.refreshToken())) throw new UnauthorizedException();
        Integer userId = jwtUtil.getValueRefreshToken(refreshToken.refreshToken());
        userRepository.findByUserIdAndStatus(userId, EStatus.ACTIVE).orElseThrow(UnauthorizedException::new);
        return TokenResponse.builder()
                            .accessToken(jwtUtil.generateAccessToken(userId))
                            .refreshToken(jwtUtil.generateRefreshToken(userId))
                            .build();
    }


    public void getCode(Email email) {
        UserEntity foundUser = userRepository.findByEmail(email.email())
                .orElseThrow(() -> new ResourceNotFoundException("Email chưa được đăng ký !!"));

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.submit(() -> emailUtil.forgotPassword(foundUser));
    }

    public UserResponse infoMe() {
        return userMapper.toDto(authCurrent.getUser());
    }

    public DropdownMe hasPermission() {
        UserEntity userCurrent = authCurrent.getUser();
        List<PermissionGroupEntity> hasPermission = userGroupRepository
                .checkPermissionByGroupId(userCurrent.getUserId());
        if(hasPermission.size() > 0) {
            return DropdownMe.builder().avatar(authCurrent.getUser().getAvatar()).hasPermission(true).build();
        }
        return DropdownMe.builder().avatar(authCurrent.getUser().getAvatar()).hasPermission(false).build();
    }

    public PageResponseCustom<BookingResponse> getBooking(PageRequestCustom pageRequestCustom) {
        UserEntity currentMe = authCurrent.getUser();
        Page<BookingResponse> foundBooking = bookingRepository.findAllByUserId(currentMe.getUserId(), pageRequestCustom.pageRequest())
                .map(data -> bookingMapper.toDto((BookingEntity) data[0], (ResidenceEntity) data[1], (ReviewEntity) data[2]));

        Map<Integer, List<BookingDetailResponse>> foundRoom = bookingDetailRepository
                .findAllByBookingId(foundBooking.getContent().stream().map(BookingResponse::bookingId).toList())
                .stream().map(bd -> bookingDetailMapper.toDto((BookingDetailEntity) bd[0],(String) bd[1]))
                .collect(Collectors.groupingBy(BookingDetailResponse::bookingId));

        return PageResponseCustom.<BookingResponse>builder()
                .data(
                        foundBooking.getContent().stream().map(b -> {
                            long dateDiff = ChronoUnit.DAYS.between(b.checkin(), b.checkout());
                            Double total = foundRoom.get(b.bookingId()).stream()
                                    .mapToDouble(data -> (double) data.price()*data.quantity())
                                    .sum()*(dateDiff > 0 ? dateDiff : 1);
                            return b.updateRooms(total, foundRoom.get(b.bookingId()));
                        }).toList()
                )
                .totalElement((int)foundBooking.getTotalElements())
                .totalPage(foundBooking.getTotalPages())
                .currentPage(pageRequestCustom.currentPage())
                .pageSize(pageRequestCustom.pageSize()).build();
    }

    @SneakyThrows
    public byte[] bookingExport(Integer bookingId) {
        BookingEntity booking = bookingRepository.findByBookingId(bookingId)
                                                 .orElseThrow(ResourceNotFoundException::new);
        ResidenceEntity residence = residenceRepository.findById(booking.getResidenceId())
                                                        .orElseThrow(ResourceNotFoundException::new);
        UserEntity user = userRepository.findById(booking.getUserId())
                                        .orElseThrow(ResourceNotFoundException::new);
        AtomicReference<Integer> index = new AtomicReference<>(0);

        List<Object[]> roomResponse = bookingDetailRepository.findByBookingId(bookingId);

        List<BookingDetail> rooms = roomResponse
                .stream().map(bd -> {
                    index.getAndUpdate(x -> x+1);
                    return bookingDetailMapper.toDto((BookingDetailEntity) bd[0],(String) bd[1], index.get());
                })
                .toList();

        Double total = roomResponse.stream()
                .map(bd -> bookingDetailMapper.toDto((BookingDetailEntity) bd[0],(String) bd[1]))
                .map(room -> room.price()*room.quantity())
                .mapToDouble(Double::doubleValue)
                .sum();


        Booking bookingResponse = bookingMapper.toDto(booking, residence, user, total);
        Document doc = new Document(getClass().getClassLoader().getResourceAsStream("template/booking.docx"));
        buildReport(doc, new Object[]{bookingResponse, rooms},
                new String[]{"booking", "rooms"},
                new Class[]{BookingResponse.class, BookingDetail.class});

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfSaveOptions saveOptions = new PdfSaveOptions();
        saveOptions.setEmbedFullFonts(true);
        saveOptions.setCompliance(PdfCompliance.PDF_A_2_U);
        saveOptions.setPreserveFormFields(true);

        doc.save(outputStream, saveOptions);
        return outputStream.toByteArray();
    }

    private void buildReport(final Document document, final Object[] dataSource, final String[] dataSourceName,
                             final Class[] knownTypes) throws Exception {
        ReportingEngine engine = new ReportingEngine();

        for (Class knownType : knownTypes) {
            engine.getKnownTypes().add(knownType);
        }

        engine.buildReport(document, dataSource, dataSourceName);
    }
}
