import React, { FC, useEffect, useState } from "react";
import { StayDataType } from "data/types";
import TabFilters from "./TabFilters";
import Pagination from "shared/Pagination/Pagination";
import './customPagination.css';
import { useLocation, useSearchParams } from "react-router-dom";
import { getAllResidence } from "apis/public/residences/residenceApi";
import { IResidenceResponse } from "apis/public/residences/interface";
import HotelBanner from "components/StayCard/HotelBanner";
import NcImage from "shared/NcImage/NcImage";

import notfoundImage from '../../images/404.png';
import { getDateAfterTomorrowFormatYYYYMMDD, getDateTomorrowFormatYYYYMMDD } from "utils/dateHandle";
import { notification } from "antd";
export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

// const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 20);
const SectionGridFilterCard: FC<SectionGridFilterCardProps> = () => {

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') === null ? 1 : Number(searchParams.get('page')));
  const [residences, setResidence] = useState({} as IResidenceResponse);

  useEffect(() => {
    setCurrentPage(searchParams.get('page') === null ? 1 : Number(searchParams.get('page')));
    async function callAPI() {
      // if (searchParams.get("checkin") !== null && searchParams.get("checkout") !== null) {
        const res = await getAllResidence(location.search);
        setResidence(res);
      // }
    }
    callAPI();
  }, [searchParams.toString()]);

  useEffect(() => {
    if(residences.totalElement === 0) {
      notification.open({
        type: 'info',
        message: 'Thông báo',
        description:'Không có phòng phù hợp với yếu cầu của bạn.',
      });
    }
  }, [residences])

  return (
    <div
      className={`nc-SectionGridFilterCard`}
      data-nc-id="SectionGridFilterCard"
    >
      {/* <Heading2 /> */}
      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* {DEMO_STAY_LISTINGS.slice((currentPage-1)*pageSize, (currentPage-1)*pageSize + pageSize).map((stay) => (
          <StayCard key={data.residenceId} data={data as StayDataType} />
        ))} */}
        {residences.data?.length > 0 && residences.data.map((residence) => (
          <HotelBanner key={residence.residenceId} tym={false} 
            href={`/residences/${residence.residenceId}?checkin=${searchParams.get("checkin") ?? getDateTomorrowFormatYYYYMMDD()}&checkout=${searchParams.get("checkout") ?? getDateAfterTomorrowFormatYYYYMMDD()}`} data={residence}/>
        ))}
      </div>
      {(residences.data?.length === 0 || residences.data === undefined) && 
        (<div className="flex justify-center">
          <NcImage src={notfoundImage} />
        </div>
      )}
      <div className="flex mt-16 justify-center items-center mb-8 lg:mb-11">
        <Pagination currentPage={currentPage} totalPage={residences.totalPage ?? 0}/>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
