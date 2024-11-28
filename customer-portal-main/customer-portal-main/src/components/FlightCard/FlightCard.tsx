import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { QRCode, Rate, notification } from "antd";
import { IHotelBooking, IReviewRequest } from "apis/auth/me/interface";
import { review } from "apis/auth/me/meApi";
import React, { FC, useEffect, useState } from "react";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import Textarea from "shared/Textarea/Textarea";
import { formatMoney } from "utils/formatMoney";

export interface FlightCardProps {
  className?: string;
  defaultOpen?: boolean;
  data: {
    id: string;
    airlines: {
      logo: string;
      name: string;
    };
    price: string;
  };
}

interface IBooking {
  className?: string;
  defaultOpen?: boolean;
  data: IHotelBooking;
}

const FlightCard: FC<IBooking> = ({
  className = "",
  data,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [reviewModel, setReviewModel] = useState({} as IReviewRequest);

  useEffect(() => {
    setReviewModel({
      bookingId: data.bookingId ?? 0,
      rating: data.rating ?? 0,
      comment: data.comment ?? ""
    })
  }, [])

  function onChangeStar(star: number) {
    setReviewModel(pre => ({...pre, rating: Number(star)}))
  }
  function onChangeComment(comment: string) {
    setReviewModel(pre => ({...pre, comment: comment}))
  }
  function onClickReview() {
    callReview();
  }
  async function callReview() {
    const response = await review(reviewModel);
    if(response.status) {
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: 'Đánh giá thành công'
      });
    } else {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: response.data
      });
    }
  }

  const renderDetailTop = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row">
          {/* <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7">
            <img src={data.airlines.logo} className="w-10" alt="" />
          </div> */}
          <div className="flex col-1 my-5 md:my-0">
            <div className="flex-shrink-0 flex flex-col items-center py-2">
              <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
              <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
              <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            </div>
            <div className="w-80 ml-4 space-y-8 text-sm">
              {
                data?.rooms && data.rooms.map((room) =>
                  <div key={room.roomTypeId} className="flex flex-col space-y-1">
                    <span className=" font-semibold">
                      {room.name}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Giá: &nbsp;&nbsp;&nbsp;{formatMoney(room.price)}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Số lượng: &nbsp;&nbsp;&nbsp;{room.quantity}
                    </span>
                  </div>
                )
              }
              {/* <div className="flex flex-col space-y-1">
                <span className="font-semibold">
                  Tokyo International Airport (HND)
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Giá: &nbsp;&nbsp;&nbsp;999.999
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Số lượng: &nbsp;&nbsp;&nbsp;2
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className=" font-semibold">
                  Tokyo International Airport (HND)
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Giá: &nbsp;&nbsp;&nbsp;999.999
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Số lượng: &nbsp;&nbsp;&nbsp;2
                </span>
              </div> */}
              {/* <div className="flex flex-col space-y-1">
                <span className=" font-semibold">
                  Tokyo International Airport (HND)
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Giá: &nbsp;&nbsp;&nbsp;999.999
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Số lượng: &nbsp;&nbsp;&nbsp;2
                </span>
              </div> */}
              
            </div>
          </div>
          <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
          {/* <div className="flex my-5 md:my-0">
            <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7"></div>
            <div className="ml-4 space-y-8 text-sm">
              <div className="flex flex-col space sm:flex-row sm:items-center space-y-6 sm:space-y-0">
                <div className="hidden lg:block flex-[6] whitespace-nowrap">
                  <span className="font-semibold">
                    Họ tên:
                    <span className="text-neutral-500 dark:text-neutral-400">Nguyễn Thanh Sang</span>
                  </span>
                </div>
                <div className="hidden lg:block flex-[6] whitespace-nowrap">
                  <span className="font-semibold">
                    Số điện thoại:
                    <span className="text-neutral-500 dark:text-neutral-400">0334428102</span>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="w-full text-sm text-neutral-500 dark:text-neutral-400 space-y-1 md:space-y-2">
            <div className="flex flex-row justify-between mb-4">
              <div className="w-full mr-8">
                <div className="relative">
                  
                </div>
              </div>
              <QRCode value="https://ant.design/" size={108} color="#8c8c8c" className="flex flex-row"/>
            </div>
            {/* <div className="w-200 border-t border-neutral-200 dark:border-neutral-700" /> */}
            <span className="text-red-500 font-semibold">Ghi chú: &nbsp;&nbsp;&nbsp;</span>
            <span>{data?.note}</span>
            {/* <span>ANA · Business class · Boeing 787 · NH 847</span> */}
            <div>
              <Rate className="mb-2" 
                    value={reviewModel.rating ?? 0} 
                    disabled={data.status !== 'COMPLETED' || data.rating > 0}
                    onChange={e => onChangeStar(e)}/>
              </div>
            <div className="relative">
              <Textarea
                // fontClass=""
                // sizeClass="h-16 w-32 px-4 py-3"
                // rounded="rounded-3xl"
                onChange={e => onChangeComment(e.target.value)}
                defaultValue={reviewModel.comment}
                placeholder="Nhập bình luận ..."
                maxLength={255}
                rows={3}
                disabled={data.status !== 'COMPLETED'}
              />
              <ButtonCircle 
                className="absolute right-2 top-1/2 transform -translate-y-1/2" 
                size=" w-12 h-12" disabled={data.status !== 'COMPLETED'}
                onClick={onClickReview}>
                <ArrowRightIcon className="w-5 h-5"/>
              </ButtonCircle>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    if (!isOpen) return null;
    return (
      <div className="p-4 md:p-8 border border-neutral-200 dark:border-neutral-700 rounded-2xl ">
        {renderDetailTop()}
        {/* <div className="my-7 md:my-10 space-y-5 md:pl-24">
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
          <div className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            Transit time: 15 hours 45 minutes - Bangkok (BKK)
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
        </div> */}
        {/* {renderDetailTop()} */}
      </div>
    );
  };

  return (
    <div
      className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
      data-nc-id="FlightCard"
    >
      <div
        className={` sm:pr-20 relative  ${className}`}
        data-nc-id="FlightCard"
      >
        {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="##" className="absolute inset-0" />
        <span className="text-red-500 font-semibold">Chú ý:</span>
        <span>&nbsp;&nbsp;Vui lòng gọi khách sạn để hủy phòng.</span>
        <span
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
            isOpen ? "transform -rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="text-xl las la-angle-down"></i>
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
          {/* LOGO IMG */}
          <div className="w-24 h-20 lg:w-32 flex-shrink-0">
            <img className="max-h-20 w-full" src={data?.avatar} alt="" />
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          <div className="block lg:hidden space-y-1">
            <div className="flex-col-space space-y-2 text-sm text-neutral-500 font-normal mt-0.5">
              {/* <div><span className="VG3hNb">2023-08-24</span></div> */}
              <span className="mx-2 text-lg">{data?.residenceName}</span>
              <div><span className="mx-2">{data?.checkin}</span><span className="mx-2"> --- </span><span className="mx-2">{data?.checkout}</span></div>
              <div><span className="mx-2">Địa chỉ:</span><span className="mx-2">{data?.address}</span></div>              
              {/* <span className="mx-2">·</span> */}
              <span>{data?.residencePhone}</span>
            </div>
          </div>

          {/* TIME - NAME */}
          <div className="hidden ml-4 lg:block min-w-[150px] flex-[5] ">
            <div className="font-medium text-lg">{data?.residenceName}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              {data?.checkin} &nbsp; --- &nbsp; {data?.checkout}
            </div>
          </div>

          {/* TIMME */}
          <div className="hidden lg:block flex-[5] whitespace-nowrap">
            <div className="font-medium text-lg">{data?.address}</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              <span>SĐT khách sạn: {data?.residencePhone}</span>
            </div>
          </div>

          {/* TYPE */}
          {/* <div className="hidden lg:block flex-[2] whitespace-nowrap">
            <div className="font-medium text-lg">0334428102</div>
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              sangdoannguyen7@gmail.com
            </div>
          </div> */}

          {/* PRICE */}
          <div className="flex-[4] whitespace-nowrap sm:text-right">
            <div>
              <span className="text-xl font-semibold text-secondary-6000">
                {formatMoney(data?.total)} VNĐ
              </span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
              {/* round-trip */}
              <Badge
                name={
                  <div className="flex items-center">
                    <i className="text-sm las la-share-alt"></i>
                    {/* <span className="ml-1">{data?.status}</span> */}
                    {data && data.status === 'PENDING' && <span className="ml-1">{'Chờ xác nhận'}</span>}
                    {data && data.status === 'CONFIRMED' && <span className="ml-1">{'Đặt thành công'}</span>}
                    {data && data.status === 'PAID_CONFIRM' && <span className="ml-1">{'Xác nhận thanh toán'}</span>}
                    {data && data.status === 'PAID' && <span className="ml-1">{'Đã thanh toán'}</span>}
                    {data && data.status === 'EXPERIENCING' && <span className="ml-1">{'Đang sử dụng'}</span>}
                    {data && data.status === 'COMPLETED' && <span className="ml-1">{'Đã hoàn thành'}</span>}
                    {data && data.status === 'CANCELED' && <span className="ml-1">{'Đã hủy'}</span>}
                  </div>
                }
                color="red"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {renderDetail()}
    </div>
  );
};

export default FlightCard;
