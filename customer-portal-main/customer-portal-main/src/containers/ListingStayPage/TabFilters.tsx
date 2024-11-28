import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import convertNumbThousand from "utils/convertNumbThousand";
import { useSearchParams } from "react-router-dom";

interface IAmenities {
  id: string;
  parentId: string;
  name: string;
  defaultChecked: boolean;
}

interface IFilter {
  type: IAmenities[];
  facilities: IAmenities[];
  rules: IAmenities[];
}

const filterData: IFilter = {
  type: [
    { id: 'hotel', parentId: 'type', name: "Khách sạn", defaultChecked: false },
    { id: 'homestay', parentId: 'type', name: "Homestay", defaultChecked: false },
    { id: 'villa', parentId: 'type', name: "Villa", defaultChecked: false },
    { id: 'home', parentId: 'type', name: "Nhà nguyên căn", defaultChecked: false },
  ],
  facilities: [
    { id: 'bbq', parentId: 'facilities', name: "Cho nướng BBQ", defaultChecked: false },
    { id: 'cook', parentId: 'facilities', name: "Cho nấu ăn", defaultChecked: false },
    { id: 'notDeposit', parentId: 'facilities', name: "Không thanh toán trước", defaultChecked: false },
    { id: 'seeView', parentId: 'facilities', name: "Nhìn ra biển", defaultChecked: false },
    { id: 'receptionist', parentId: 'facilities', name: "Lễ tân 24h", defaultChecked: false },
    { id: 'washing', parentId: 'facilities', name: "Máy giặc (miễn phí)", defaultChecked: false },
  ],
  rules: [
    { id: 'pet', parentId: 'rules', name: "Cho nuôi thú cưng", defaultChecked: false }, 
    { id: 'smoking', parentId: 'rules', name: "Cho hút thuốc", defaultChecked: false }
  ]
}

const moneyFormat = (money: number) => {
  // return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(10_000_000);
  return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const TabFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenPriceRange, setisOpenPriceRange] = useState(false);
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
  const [rangePrices, setRangePrices] = useState([0, 5_000_000]);
  const [filter, setFilter] = useState(filterData);
  // let filter = filterData;
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
    notDeposit: searchParams.get('notDeposit'),
    seeView: searchParams.get('seeView'),
    receptionist: searchParams.get('receptionist'),
    washing: searchParams.get('washing'),
    pet: searchParams.get('pet'),
    smoking: searchParams.get('smoking')
  });
  
  useEffect(() => {
    setRangePrices([search?.priceMin !== null ? Number(search.priceMin) : 0, search?.priceMax !== null ? Number(search.priceMax) : 5_000_000])
    const loadURL: IFilter = {
      type: [
        { id: 'hotel', parentId: 'type', name: "Khách sạn", defaultChecked: search?.hotel === 'true' ? true : false },
        { id: 'homestay', parentId: 'type', name: "Homestay", defaultChecked: search?.homestay === 'true' ? true : false },
        { id: 'villa', parentId: 'type', name: "Villa", defaultChecked: search?.villa === 'true' ? true : false },
        { id: 'home', parentId: 'type', name: "Nhà nguyên căn", defaultChecked: search?.home === 'true' ? true : false },
      ],
      facilities: [
        { id: 'bbq', parentId: 'facilities', name: "Cho nướng BBQ", defaultChecked: search?.bbq === 'true' ? true : false },
        { id: 'cook', parentId: 'facilities', name: "Cho nấu ăn", defaultChecked: search?.cook === 'true' ? true : false },
        { id: 'notDeposit', parentId: 'facilities', name: "Không thanh toán trước", defaultChecked: search?.notDeposit === 'true' ? true : false },
        { id: 'seeView', parentId: 'facilities', name: "Nhìn ra biển", defaultChecked: search?.seeView === 'true' ? true : false },
        { id: 'receptionist', parentId: 'facilities', name: "Lễ tân 24h", defaultChecked: search?.receptionist === 'true' ? true : false },
        { id: 'washing', parentId: 'facilities', name: "Máy giặc (miễn phí)", defaultChecked: search?.washing === 'true' ? true : false },
      ],
      rules: [
        { id: 'pet', parentId: 'rules', name: "Cho nuôi thú cưng", defaultChecked: search?.pet === 'true' ? true : false }, 
        { id: 'smoking', parentId: 'rules', name: "Cho hút thuốc", defaultChecked: search?.smoking === 'true' ? true : false }
      ]
    }
    setFilter(loadURL);
    // filter = loadURL;
  }, [search])
  //
  const closeModalPriceRange = () => setisOpenPriceRange(false);
  const openModalPriceRange = () => setisOpenPriceRange(true);
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);
  //
  const onApply = () => {
    let params: Record<string, string> = {};
    if(searchParams?.get("checkin") !== null) {
      params["checkin"] = searchParams?.get("checkin") ?? '';
    } 
    if(searchParams?.get("checkout") !== null) {
      params["checkout"] = searchParams?.get("checkout") ?? '';
    }
    if(rangePrices[0] !== 0) {
      params["priceMin"] = rangePrices[0].toString();
    }
    if(rangePrices[1] !== 5_000_000) {
      params["priceMax"] = rangePrices[1].toString();
    }
    filter.type.forEach(item => {
      if(item.defaultChecked) {
        params[item.id] = 'true';
      }
    })
    filter.facilities.forEach(item => {
      if(item.defaultChecked) {
        params[item.id] = 'true';
      }
    })
    filter.rules.forEach(item => {
      if(item.defaultChecked) {
        params[item.id] = 'true';
      }
    })
    closeModalMoreFilter();
    closeModalMoreFilterMobile();
    closeModalPriceRange();
    setSearchParams(params);
  }

  const onClosePrice = () => {
    setRangePrices([0, 5_000_000]);
  }

  const onCloseFilter = () => {
    setFilter(filterData);
    filter.type.forEach((item, i) => {
      if(item.defaultChecked === false) {
        onCheck(item.id, item.parentId);
      }
    })
    // filter = filterData;
  }

  const onCloseModal = () => {
    let params: Record<string, string> = {};
    if(searchParams?.get("checkin") !== null) {
      params["checkin"] = searchParams?.get("checkin") ?? '';
    } 
    if(searchParams?.get("checkout") !== null) {
      params["checkout"] = searchParams?.get("checkout") ?? '';
    }
    // filter = filterData;
    closeModalMoreFilter();
    closeModalMoreFilterMobile();
    setFilter(filterData);
    setSearchParams(params);
  }

  //
  const onCheck = (id: string, parentId: string) => {
    switch (parentId) {
      case 'type':
        filter.type.forEach((ite, i) => {
          if(ite.id === id) {
            filter.type[i].defaultChecked = !filter.type[i].defaultChecked;
          }
        })
        break;
      case 'facilities':
        filter.facilities.forEach((ite, i) => {
          if(ite.id === id) {
            filter.facilities[i].defaultChecked = !filter.facilities[i].defaultChecked;
          }
        })
        break;
      case 'rules':
        filter.rules.forEach((ite, i) => {
          if(ite.id === id) {
            filter.rules[i].defaultChecked = !filter.rules[i].defaultChecked;
          }
        })
        break;
    }
  }
  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
              onClick={openModalPriceRange}
            >
              <span>
                {`${convertNumbThousand(
                  rangePrices[0]
                )} VNĐ - ${convertNumbThousand(rangePrices[1])} VNĐ`}{" "}
              </span>
              {renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              show={isOpenPriceRange}
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Giá 1 ngày</span>
                      <Slider
                        range
                        className="text-red-400"
                        min={0}
                        max={10_000_000}
                        value={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Giá thấp nhất
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={moneyFormat(rangePrices[0])}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Giá cao nhất
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={moneyFormat(rangePrices[1])}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={onClosePrice} sizeClass="px-4 py-2 sm:px-5">
                      Xóa
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={onApply}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Áp dụng
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      id: string,
      parentId: string,
      name: string;
      defaultChecked?: boolean;
    }[]
  ) => {    

    // data.forEach((item) => {
    //   if(item.defaultChecked === true) {
    //     onCheck(item.id, item.parentId)
    //   }
    // })

    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              defaultChecked={item.defaultChecked}
              onChange={() => onCheck(item.id, item.parentId)}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              defaultChecked={item.defaultChecked}
              onChange={() => onCheck(item.id, item.parentId)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTabMoreFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>Lọc theo yêu cầu</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={() => {}}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      More filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={() => {    
                        closeModalMoreFilter();
                        closeModalMoreFilterMobile();}} 
                      />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Nơi nghỉ</h3>
                        <div className="mt-6 relative">
                          {renderMoreFilterItem(filter.type)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Tiện ích</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(filter.facilities)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Quy định</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(filter.rules)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={onCloseFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                      disabled
                    >
                      Xoá
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={onApply}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Áp dụng
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const renderTabMoreFilterMobile = () => {
    return (
      <div>
        <div
          className={`flex lg:hidden items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilterMobile}
        >
          <span>Bộ lọc</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={onCloseModal}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Bộ lọc
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={onCloseModal} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* ---- */}
                      {/* <div className="py-7">
                        <h3 className="text-xl font-medium">Chỗ ở</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(typeOfPaces)}
                        </div>
                      </div> */}

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Giá 1 ngày</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={0}
                                max={10_000_000}
                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Giá thấp nhất
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={moneyFormat(rangePrices[0])}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Giá cao nhất
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={moneyFormat(rangePrices[1])}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Nơi nghỉ</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(filter.type)}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Tiện nghi</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(filter.facilities)}
                        </div>
                      </div>

                      {/* ---- */}
                      {/* <div className="py-7">
                        <h3 className="text-xl font-medium">Tiện ích</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(filter.amenities)}
                        </div>
                      </div> */}

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Quy định</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(filter.rules)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={onCloseModal}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Xoá
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={onApply}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Áp dụng
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">
        {/* {renderTabsTypeOfPlace()} */}
        {renderTabsPriceRage()}
        {/* {renderTabsRoomAndBeds()} */}
        {renderTabMoreFilter()}
      </div>
      {renderTabMoreFilterMobile()}
    </div>
  );
};

export default TabFilters;
