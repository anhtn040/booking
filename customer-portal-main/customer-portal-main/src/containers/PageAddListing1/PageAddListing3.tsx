import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC } from "react";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Textarea from "shared/Textarea/Textarea";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import StayDatesRangeInput from "components/HeroSearchForm/(stay-search-form)/StayDatesRangeInput";
import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref="/add-listing-4"
    >
      <>
        <h2 className="text-2xl font-semibold"> Tour Hòn Tranh</h2>
        <FlightDateRangeInput
          selectsRange={false}
          // className="flex-1"
        />
        {/* <div className="w-36 border-b border-neutral-200 dark:border-neutral-700"></div> */}
        {/* FORM */}
        
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem 
            label="Chọn mức giá"
            desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
            >
            <Select>
              <option value="100">
                <h2 className="text-2xl font-semibold">Đặt dịch vụ</h2>
              </option>
              <option value="100">Tour Hòn Tranh buổi chiều</option>
            </Select>
          </FormItem>
          <FormItem>
            <NcInputNumber label="Số lượng" defaultValue={4} desc="Giá tính theo người"/>
          </FormItem>
          <FormItem label="Ghi chú">
            <Textarea placeholder="..." rows={4}/>
          </FormItem>
        </div>
      </>


      <div className="w-22 border-b border-neutral-200 dark:border-neutral-700"></div>
      <>
        <h2 className="text-2xl font-semibold">Tour Hòn Tranh</h2>
        <FlightDateRangeInput
          selectsRange={false}
          // className="flex-1"
        />
        {/* FORM */}
        
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem 
            label="Chọn mức giá"
            desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
            >
            <Select>
              <option value="100">
                <h2 className="text-2xl font-semibold">Đặt dịch vụ</h2>
              </option>
              <option value="100">Tour Hòn Tranh buổi chiều</option>
            </Select>
          </FormItem>
          <FormItem>
            <NcInputNumber label="Số lượng" defaultValue={4} desc="Giá tính theo người"/>
          </FormItem>
          <FormItem label="Ghi chú">
            <Textarea placeholder="..." rows={4}/>
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;
