import { notification } from "antd";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import { getBefore2MonthMilliseconds, getDateAfterTomorrow, getDateFormatYYYYMMDD, getDateTomorrow } from "utils/dateHandle";

interface IDateRange {
  checkin: string,
  checkout: string
}

const SectionDateRange = (dateRange: IDateRange) => {
  const [api, contextHolder] = notification.useNotification();
  const [startDate, setStartDate] = useState<Date | null>(new Date(dateRange.checkin));
  const [endDate, setEndDate] = useState<Date | null>(new Date(dateRange.checkout));

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onCheckRoom = () => {
    if(startDate === null || endDate === null) {
      api.warning({
        message: 'Thông báo',
        description: 'Vui lòng chọn ngày hợp lệ'
      })
    } else {
      window.location.href = `${window.location.pathname}?checkin=${getDateFormatYYYYMMDD(startDate)}&checkout=${getDateFormatYYYYMMDD(endDate)}`
    }
  }

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {contextHolder}
        {/* HEADING */}
        {/* <div>
          <h2 className="text-2xl font-semibold">Chọn ngày</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
          <div className="dark:bg-neutral-900 dark:border-neutral-800 flex items-center justify-between">
            <ButtonThird onClick={() => {}} sizeClass="px-4 py-2 sm:px-5">
              Xóa
            </ButtonThird>
            <ButtonPrimary
              onClick={() => {}}
              sizeClass="px-4 py-2 sm:px-5"
            >
              Chọn
            </ButtonPrimary>
          </div>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div> */}
        {/* CONTENT */}

        <div className="">
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
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="dark:bg-neutral-900 dark:border-neutral-800 flex items-center justify-between">
          {/* <ButtonThird onClick={() => {}} sizeClass="px-4 py-2 sm:px-5">
            Xóa
          </ButtonThird> */}
          <div className="px-4 py-2 sm:px-5"></div>
          <ButtonPrimary
            onClick={() => onCheckRoom()}
            sizeClass="px-4 py-2 sm:px-5"
          >
            Kiểm tra phòng trống
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
