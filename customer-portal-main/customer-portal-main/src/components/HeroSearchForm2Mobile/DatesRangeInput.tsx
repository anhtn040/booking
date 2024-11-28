import DatePicker from "react-datepicker";
import React, { FC, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import { getDateFormatYYYYMMDD } from "utils/dateHandle";
import { useSearchParams } from "react-router-dom";
import { message, notification } from 'antd';
export interface StayDatesRangeInputProps {
  className?: string;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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
  }, [search])

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if(getDateFormatYYYYMMDD(start) < getDateFormatYYYYMMDD(new Date())) {
      setStartDate(null);
      setEndDate(null);
      message.warning('Ngày chọn không hợp lệ');
      return;
    }
    setStartDate(start);
    setEndDate(end);
    if(start !== null && end !== null) {
      let params: Record<string, string> = {};

      params["checkin"] = getDateFormatYYYYMMDD(start);
      params["checkout"] = getDateFormatYYYYMMDD(end);
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
      
      setSearchParams(params);
    }
  };

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` Chọn ngày`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
