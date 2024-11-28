import React, { FC } from "react";
import Gallery from "components/GallerySlider/Gallery";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import { IResidenceBanner } from "apis/public/residences/interface";
import { formatMoney } from "utils/formatMoney";
export interface StayCardProps {
  className?: string;
  data?: IResidenceBanner;
  size?: "default" | "small";
  href?: string;
  tym: boolean;
}

const DEMO: IResidenceBanner = {
  residenceId: 1,
  name: '',
  address: '',
  type: '',
  roomQuantity: 1,
  priceMin: 1,
  rating: 1,
  reviews: 1,
  avatar: ''
}

const HotelBanner: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO,
  href = "",
  tym = false
}) => {

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <Gallery
          uniqueID={`StayCard_${data.residenceId}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          avatar={data.avatar}
          href={href}
        />
        <BtnLikeIcon 
          isLiked={tym} residenceId={data.residenceId}
          className="absolute right-3 top-3 z-[1]" 
          colorClass="text-red-500 bg-white bg-opacity-30 hover:bg-opacity-50"/>
        {<SaleOffBadge className={`absolute left-3 top-3 ${data.roomQuantity > 0 ? `bg-primary-6000` : `bg-red-700`}`} desc={`${data.roomQuantity > 0 ? `${data.roomQuantity.toString()} phòng trống` : 'Hết phòng'}`}/>}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
             {bedrooms} beds
          </span> */}
            {data.type === 'HOTEL' && <Badge name='Khách sạn' color='green' />}
            {data.type === 'HOMESTAY' && <Badge name='Homestay' color='purple' />}
            {data.type === 'VILLA' && <Badge name='Villa' color='red' />}
            {data.type === 'HOME' && <Badge name='Nhà nguyên căn' color='yellow' />}
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{data.name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {/* {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )} */}
            <span className="">{data.address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {formatMoney(data.priceMin)}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /đêm
              </span>
            )}
          </span>
          {/* {!!data.rating && (
            <StartRating reviewCount={data.reviews} point={data.rating} />
          )} */}
          <StartRating reviewCount={data.reviews} point={data.rating === 0 ? 5 : data.rating} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link to={href}>{renderContent()}</Link>
    </div>
  );
};

export default HotelBanner;
