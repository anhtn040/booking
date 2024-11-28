import React, { FC, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Checkbox2 from "shared/Checkbox/checkbox2";
import { ParentState } from "containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage";
import { IRoomBanner } from "apis/public/residences/interface";
import { formatMoney } from "utils/formatMoney";
import StartRating from "components/StartRating/StartRating";

export interface PropertyCardHProps {
  className?: string;
  data?: IRoomBanner;
  setChildState: React.Dispatch<ParentState>;
}

const DEMO_DATA: IRoomBanner = {
  roomTypeId: 0,
  name: "",
  beds: 0,
  area: 0,
  quantity: 0,
  price: 0,
  images: [""]
};

const PropertyCard: FC<PropertyCardHProps> = ({
  className = "",
  data = DEMO_DATA,
  setChildState
}) => {
  const {
    images,
    name,
    beds,
    area,
    price,
    quantity,
    roomTypeId,
  } = data;

  const handleChange = (room: ParentState) => {
    setChildState(room);
  };

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={images ?? []}
          className="w-full h-full rounded-2xl overflow-hidden will-change-transform"
          uniqueID={`PropertyCardH_${roomTypeId}`}
        />

        {quantity > 0 ? 
        (<SaleOffBadge className="absolute left-5 top-5 !bg-primary-6000" desc={`Còn ${quantity} phòng`}/>) 
        :
        (<SaleOffBadge className="absolute left-5 top-5 !bg-red-700" desc={`Hết phòng`}/>)}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="flex space-x-8 inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {`${beds} giường`}
          </span>
        </div>
        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {`${area} m2`}
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            {beds === 1 && <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">Cặp đôi</span>
                </div>
              }
            />}
            {beds >= 2 && beds < 5 && <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">Gia đình</span>
                </div>
              }
            />}
            {beds > 5 && <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">Tập thể</span>
                </div>
              }
              color="yellow"
            />}
          </div>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{name}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div>
          <div className="flex w-full justify-between items-end">
            {/* <StartRating reviewCount={0} point={0} /> */}
            <div
              className={`nc-StartRating flex items-center space-x-1 text-sm`}
              data-nc-id="StartRating"
            ></div>
            <span className="flex items-center justify-center px-3 py-2 border border-secondary-500 rounded leading-none text-base font-medium text-secondary-500">
              {price && formatMoney(price)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="PropertyCardH"
    >
      {/* <Link to={href} className="absolute inset-0"></Link> */}
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
      {/* <BtnLikeIcon
        colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
        isLiked={like}
        className="absolute right-5 top-5 sm:right-3 sm:top-3 "
      /> */}
      {data.quantity > 0 ?
        <Checkbox2
          className="absolute border rounded-md p-2 right-5 top-5 sm:right-3 sm:top-3 border-primary-500"
          name='Chọn phòng'
          label='Chọn phòng'
          defaultChecked={false}
          onChange={(e) => handleChange({id: String(roomTypeId), selected: e.valueOf()})}
        /> 
      : <></>
      }
      </div>
  );
};

export default PropertyCard;
