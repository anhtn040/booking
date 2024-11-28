import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

export interface PaginationProps {
  // className?: string;
  currentPage: number;
  totalPage: number;
}

const Pagination = ({totalPage}: PaginationProps) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') === null ? 1 : Number(searchParams.get('page')));
  const [search, setSearch] = useState({
    checkin: searchParams.get('checkin'),
    checkout: searchParams.get('checkout'),
    priceMin: searchParams.get('priceMin'),
    priceMax: searchParams.get('priceMax'),
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
    smoking: searchParams.get('smoking'),
    page: searchParams.get('page'),
  });
  useEffect(() => {
    setSearch({
      checkin: searchParams.get('checkin'),
      checkout: searchParams.get('checkout'),
      priceMin: searchParams.get('priceMin'),
      priceMax: searchParams.get('priceMax'),
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
      smoking: searchParams.get('smoking'),
      page: searchParams.get('page'),
    });  
  }, [searchParams])

  const onClickPagination = (page: number) => {
    let params: Record<string, string> = {};

    if(search?.checkin) { params["checkin"] = search.checkin; }
    if(search?.checkout) { params["checkout"] = search.checkout; }
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

    params["page"] = page.toString(); 
    setSearchParams(params);
    setCurrentPage(page);
  }

  const renderItem = (index: number, currentPage: number) => {
    // RETURN ...
    if (index !== 0 && index !== totalPage-1 && index !== currentPage-1 && (index > currentPage+1 || index < currentPage-2)) {
      if(index === 1 || index === totalPage-2) {
        return (
          <span
            key={index}
            className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${twFocusClass()}`}
          >
            <>...</>
          </span>
        );
      }
      return;
    }
    // RETURN ACTIVE PAGINATION
    if (index === (currentPage === undefined || currentPage <= 0 ? 0 : currentPage-1)) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {index+1}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <span
        key={index}
        className={`inline-flex cursor-pointer w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => {onClickPagination(index+1)}}
      >
        {index+1}
      </span>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium`}
    >
      <button
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700`}
        // onClick={onClickPrev}
        data-glide-dir="<"
        onClick={() => onClickPagination(currentPage-1)}
        disabled={currentPage <= 1}
      >
        <i className="las la-angle-left"></i>
      </button>
      {Array.from({length: totalPage}).map((v, i) => renderItem(i, currentPage))}
      <button
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700`}
        onClick={() => onClickPagination(currentPage+1)}
        disabled={currentPage >= totalPage || totalPage === 0}
        data-glide-dir="<"
      >
        <i className="las la-angle-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;
