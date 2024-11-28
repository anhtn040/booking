import React, { Fragment, useState, FC, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import ClearDataButton from "../ClearDataButton";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import { notification } from 'antd';
import { useSearchParams } from "react-router-dom";

import { getBefore2MonthMilliseconds, getDateFormatYYYYMMDD } from "utils/dateHandle";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface StayDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
}

export interface IDatePicker {
  start: string;
  end: string;
  expiringDate: string;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [isOpenChooseDate, setIsOpenChooseDate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    priceMin: searchParams.get('priceMin'),
    priceMax: searchParams.get('priceMax'),
    checkin: searchParams.get('checkin'),
    checkout: searchParams.get('checkout'),
    priceRange: searchParams.get('priceRange'),
    hotel: searchParams.get('hotel'),
    homestay: searchParams.get('homestay'),
    villa: searchParams.get('villa'),
    home: searchParams.get('home'),
    bbq: searchParams.get('bbq'),
    cook: searchParams.get('cook'),
    water: searchParams.get('water'),
    notDeposit: searchParams.get('notDeposit'),
    wharf: searchParams.get('wharf'),
    seeView: searchParams.get('seeView'),
    bancol: searchParams.get('bancol'),
    receptionist: searchParams.get('receptionist'),
    restaurant: searchParams.get('restaurant'),
    washing: searchParams.get('washing'),
    bathtub: searchParams.get('bathtub'),
    pet: searchParams.get('pet'),
    smoking: searchParams.get('smoking')
  });

  useEffect(() => {
    if(search?.checkin && search.checkin > getDateFormatYYYYMMDD(new Date())) {
      setStartDate(new Date(search.checkin));
    }
    if(search?.checkout && search.checkout > getDateFormatYYYYMMDD(new Date())) {
      setEndDate(new Date(search.checkout));
    }
    setSearch({
      priceMin: searchParams.get('priceMin'),
      priceMax: searchParams.get('priceMax'),
      checkin: searchParams.get('checkin'),
      checkout: searchParams.get('checkout'),
      priceRange: searchParams.get('priceRange'),
      hotel: searchParams.get('hotel'),
      homestay: searchParams.get('homestay'),
      villa: searchParams.get('villa'),
      home: searchParams.get('home'),
      bbq: searchParams.get('bbq'),
      cook: searchParams.get('cook'),
      water: searchParams.get('water'),
      notDeposit: searchParams.get('notDeposit'),
      wharf: searchParams.get('wharf'),
      seeView: searchParams.get('seeView'),
      bancol: searchParams.get('bancol'),
      receptionist: searchParams.get('receptionist'),
      restaurant: searchParams.get('restaurant'),
      washing: searchParams.get('washing'),
      bathtub: searchParams.get('bathtub'),
      pet: searchParams.get('pet'),
      smoking: searchParams.get('smoking')
    });
  }, [searchParams])

  const applyChangeDate = () => {
    if(startDate === null || endDate === null) {
      setStartDate(null);
      setEndDate(null);
      api.warning({
        message: 'Cảnh báo',
        description: 'Vui lòng chọn ngày !!',
      });
      return;
    }
    let params: Record<string, string> = {};

    params["checkin"] = getDateFormatYYYYMMDD(startDate ?? new Date());
    params["checkout"] = getDateFormatYYYYMMDD(endDate ?? new Date());
    if(search?.priceMin) { params["priceMin"] = search.priceMin; }
    if(search?.priceMax) { params["priceMax"] = search.priceMax; }

    if(search?.home) { params["home"] = search.home; }
    if(search?.homestay) { params["homestay"] = search.homestay; }
    if(search?.villa) { params["villa"] = search.villa; }
    if(search?.home) { params["home"] = search.home; }

    if(search?.bbq) { params["bbq"] = search.bbq; }
    if(search?.cook) { params["cook"] = search.cook; }
    if(search?.water) { params["water"] = search.water; }
    if(search?.notDeposit) { params["notDeposit"] = search.notDeposit; }

    if(search?.wharf) { params["wharf"] = search.wharf; }
    if(search?.seeView) { params["seeView"] = search.seeView; }
    if(search?.bancol) { params["bancol"] = search.bancol; }
    if(search?.receptionist) { params["receptionist"] = search.receptionist; }

    if(search?.restaurant) { params["restaurant"] = search.restaurant; }
    if(search?.washing) { params["washing"] = search.washing; }
    if(search?.bathtub) { params["bathtub"] = search.bathtub; }
    
    if(search?.pet) { params["pet"] = search.pet; }
    if(search?.smoking) { params["smoking"] = search.smoking; }
    
    setIsOpenChooseDate(false);
    setSearchParams(params);
  }

  const closeChangeDate = () => {
    onChangeDate([null, null]);
  }

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderInput = () => {
    return (
      <>
        {contextHolder}
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString("vi-vn", {
              month: "short",
              day: "2-digit",
            }) || "Chọn ngày"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("vi-vn", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Ngày nhận - Ngày trả"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {/* {({ open }) => ( */}
        <>
          <Popover.Button
            className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${
              isOpenChooseDate ? "nc-hero-field-focused" : ""
            }`}
            onClickCapture={() => {document.querySelector("html")?.click(); setIsOpenChooseDate(!isOpenChooseDate)}}
          >
            {renderInput()}
            {startDate && isOpenChooseDate && (
              <ClearDataButton onClick={() => onChangeDate([null, null])} />
            )}
          </Popover.Button>

          {isOpenChooseDate && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            show={isOpenChooseDate}
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              {isOpenChooseDate ? (
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  maxDate={new Date(getBefore2MonthMilliseconds())}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
                <div className="p-5 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird type="button" sizeClass="px-4 py-2 sm:px-5" onClick={closeChangeDate}>
                    Xóa
                  </ButtonThird>
                  <ButtonPrimary type="button" sizeClass="px-4 py-2 sm:px-5" onClick={applyChangeDate}>
                    Áp dụng
                  </ButtonPrimary>
                </div>
              </div>) : <></>}
            </Popover.Panel>
          </Transition>
        </>
      {/* )} */}
    </Popover>
  );
};

export default StayDatesRangeInput;
