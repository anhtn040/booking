import React, { FC, useEffect, useState } from "react";
// import { GuestsObject } from "components/HeroSearchForm/type";
// import StartRating from "components/StartRating/StartRating";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Popconfirm, notification } from "antd";
import { ICartStorage } from "apis/public/residences/interface";
import { formatMoney } from "utils/formatMoney";
import { IBookingDetail, IBookingForm } from "apis/auth/me/interface";
import { bookingResidence } from "apis/auth/me/meApi";
import StayDatesRangeInput from "containers/ListingDetailPage/listing-stay-detail/StayDatesRangeInput";
import { getDateAfterTomorrow, getDateDiff, getDateTomorrow } from "utils/dateHandle";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {

  const [onConfirm, setOnConfirm] = useState(false);
  const [bookingForm, setBookingForm] = useState({} as IBookingForm);
    
  function onClickComplete(): void {
    setOnConfirm(true);
  }

  useEffect(() => {
    const roomsSelected = JSON.parse(localStorage.getItem("cart") ?? "") as ICartStorage;
    if(roomsSelected) {
      setBookingForm(preData => ({...preData, 
        bookingDetail: roomsSelected.roomList.map((data) => {
          const room: IBookingDetail = {
            roomTypeId: data.roomTypeId,
            quantity: data.currentQuantity
          }
          return room;
      }),
      residenceId: roomsSelected.residenceId,
      checkin: roomsSelected.checkin,
      checkout: roomsSelected.checkout}))
    }
  }, [])

  const onChangeName = (name: string) => {
    setBookingForm(preData => ({...preData, name: name}));
  }
  const onChangeIdentify = (identifyId: string) => {
    setBookingForm(preData => ({...preData, identifyId: identifyId}));
  }
  const onChangeEmail = (email: string) => {
    setBookingForm(preData => ({...preData, email: email}));
  }
  const onChangePhone = (phone: string) => {
    setBookingForm(preData => ({...preData, phone: phone}));
  }
  const onChangeNote = (note: string) => {
    setBookingForm(preData => ({...preData, note: note}));
  }
  const onBooking = async () => {
    const response = await bookingResidence(bookingForm);
    setOnConfirm(false);
    if(response.status === false) {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: response.data
      });
    } else {
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: 'Đặt phòng thành công'
      });
      window.location.href = "/account-billing"
    }
  }

  const renderSidebar = () => {
    const roomsSelected = JSON.parse(localStorage.getItem("cart") ?? "") as ICartStorage;
    // setCart(roomsSelected);
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-xl font-semibold">
            {/* $119 */}
            Danh sách phòng đã chọn
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              {/* /night */}
              {/* Danh sách phòng đã chọn */}
            </span>
          </span>
          {/* <StartRating /> */}
        </div>

        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          {/* <StayDatesRangeInput className="flex-1 z-[11]"/> */}
          {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* <GuestsInput className="flex-1" /> */}
          <StayDatesRangeInput className="flex-1 z-[11]" 
            start={roomsSelected.checkin ? new Date(roomsSelected.checkin) : getDateTomorrow()} 
            end={roomsSelected.checkout ? new Date(roomsSelected.checkout) : getDateAfterTomorrow()}/>
          {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* <GuestsInput className="flex-1" /> */}
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$119 x 3 night</span>
            <span>$357</span>
          </div> */}
          {/* <div>
            <div className="flex justify-between columns-3 text-neutral-6000 dark:text-neutral-300">
              <span>Phòng giường đôi view VIP VIP</span>
              <span className="p-2"></span>
              <span>1.000.000</span>
            </div>
              <NcInputNumber className="w-full" label="Số lượng" min={1} defaultValue={4} desc={'Còn 3 phòng'}/>
          </div> */}
          {
            roomsSelected?.roomList && roomsSelected?.roomList.map((room, index) => (
              <div key={index}>
                <div className="flex justify-between columns-3 text-neutral-6000 dark:text-neutral-300">
                  <span>{room.name}</span>
                  <span className="p-2"></span>
                  <span>{formatMoney(room.price)}</span>
                </div>
                <NcInputNumber className="w-full" label="Số lượng" min={room.currentQuantity} max={room.currentQuantity} defaultValue={room.currentQuantity}/>
              </div>
            ))
          }
          
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Đã bao gồm VAT</span>
            <span>{getDateDiff(bookingForm?.checkin, bookingForm?.checkout)} Đêm</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-red-400">Tổng cộng</span>
            <span>{formatMoney((roomsSelected.roomList.reduce((total, data) => total += (data.price*data.currentQuantity), 0) ?? 0)*(getDateDiff(bookingForm?.checkin, bookingForm?.checkout)))} VNĐ</span>
          </div>
        </div>
        <div className="pt-8 flex justify-between">
          <ButtonSecondary href={"/pay-done"}>Quay lại</ButtonSecondary>
          <Popconfirm
            className="bg-primary-600"
            title="Xác nhận đặt phòng"
            description="Hãy kiểm tra kỹ đơn đặt phòng nhé !!"
            cancelText="Hủy"
            okText="Đồng ý"
            okButtonProps={{className: "bg-primary-6000"}}
            cancelButtonProps={{className: "border-red-500"}}
            open={onConfirm}
            onConfirm={onBooking}
            onCancel={() => setOnConfirm(false)}
          >
            <ButtonPrimary type="button" 
                           onClick={onClickComplete}>Hoàn thành đặt phòng</ButtonPrimary>
          </Popconfirm>
        </div>
      </div>
    );
  };

  const renderMain = () => {

    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-2xl font-semibold">
          Thông tin liên hệ
        </h2>
        <span className="text-md text-neutral-500 text-red-500 block">
          Lưu ý: Mọi thông tin dưới đây phải thật chính xác. 
          Nếu khách sạn không thể liên lạc được với bạn để xác nhận, thì đơn sẽ được huỷ theo quy trình.
        </span>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-5">
          {/* <div className="flex space-x-5  ">
            <div className="flex-1 space-y-1">
              <Label>Họ tên</Label>
              <Input type="text" defaultValue="Nguyễn Thanh Sang" />
            </div>
            <div className="flex-1 space-y-1">
              <Label>CMND/CCCD</Label>
              <Input type="text" defaultValue="060201009770"/>
            </div>
          </div> */}
          <div className="space-y-1">
            <Label>Họ tên</Label>
            <Input type="text" 
                   defaultValue={bookingForm.name ?? ""} 
                   placeholder="Nguyễn Thanh Sang" 
                   onChange={(e) => onChangeName(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label>CMND/CCCD</Label>
            <Input type="text"
                   defaultValue={bookingForm.identifyId ?? ""} 
                   placeholder="060201009770"
                   onChange={(e) => onChangeIdentify(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input type="email" 
                   defaultValue={bookingForm.email ?? ""} 
                   placeholder="sangnguyen@gmail.com" 
                   onChange={(e) => onChangeEmail(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label>Số điện thoại</Label>
            <Input type="text" 
                   defaultValue={bookingForm.phone ?? ""} 
                   minLength={10} maxLength={10} 
                   placeholder="0334428102" 
                   onChange={(e) => onChangePhone(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label>Ghi chú</Label>
            <Textarea
              defaultValue={bookingForm.note ?? ""} 
              placeholder="Gửi ghi chú cho khách sạn." 
              onChange={(e) => onChangeNote(e.target.value)}/>
            {/* <span className="text-sm text-neutral-500 block">
              Write a few sentences about yourself.
            </span> */}
          </div>
        </div>
        {/* <div className="pt-8 flex justify-between">
          <ButtonSecondary href={"/pay-done"}>Quay lại</ButtonSecondary>
          <Popconfirm
            className="bg-primary-600"
            title="Xác nhận đặt phòng"
            description="Hãy kiểm tra kỹ đơn đặt phòng nhé !!"
            cancelText="Hủy"
            okText="Đồng ý"
            okButtonProps={{className: "bg-primary-6000"}}
            cancelButtonProps={{className: "border-red-500"}}
            open={onConfirm}
            onConfirm={() => setOnConfirm(false)}
            onCancel={() => setOnConfirm(false)}
          >
            <ButtonPrimary type="button" onClick={onClickComplete}>Hoàn thành đặt phòng</ButtonPrimary>
          </Popconfirm>
        </div> */}
        {/* <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <img className="w-8" src={visaPng} alt="visa" />
                      <img
                        className="w-8"
                        src={mastercardPng}
                        alt="mastercard"
                      />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary href={"/pay-done"}>Confirm and pay</ButtonPrimary>
            </div>
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
