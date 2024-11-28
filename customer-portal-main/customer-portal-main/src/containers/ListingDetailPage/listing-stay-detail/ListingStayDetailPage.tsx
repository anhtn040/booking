import React, { FC, useEffect, useState } from "react";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import StartRating from "components/StartRating/StartRating";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import StayDatesRangeInput from "./StayDatesRangeInput";
// import { Amenities_demos, PHOTOS } from "./constant";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import PropertyCard from "components/PropertyCardH/PropertyCard";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { getComments, getImageResidence, getResidenceInfo, getRoomBanner } from "apis/public/residences/residenceApi";
import { ICartStorage, IComment, ICommentResponse, IResidenceInfo, IRoomBanner, IRoomSelected } from "apis/public/residences/interface";
import Pagination from "shared/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { getBefore1HourMilliseconds, getCurrentMilliseconds, getDateAfterTomorrow, getDateAfterTomorrowFormatYYYYMMDD, getDateDiff, getDateFormatDDMM, getDateTomorrow, getDateTomorrowFormatYYYYMMDD } from "utils/dateHandle";
import SectionDateRange from "./SectionDateRange";
import { formatMoney } from "utils/formatMoney";
import { checkToken } from "apis/auth/me/meApi";
export interface ParentState {
  id: string;
  selected: boolean;
}

const roomSelected: ParentState = {id: '', selected: false};

const rooms_demo: IRoomBanner[] = [{
  roomTypeId: 0,
  name: "",
  beds: 0,
  area: 0,
  quantity: 0,
  price: 0,
  images: [""]
}]

const StayDetailPageContainer: FC<{}> = () => {
  //
  let [searchParams] = useSearchParams();
  // const pageComment = searchParams?.get("page") ?? 1;
  const checkin = searchParams?.get("checkin") ?? getDateTomorrowFormatYYYYMMDD();
  const checkout = searchParams?.get("checkout") ?? getDateAfterTomorrowFormatYYYYMMDD();
  const pathSplit = window.location.pathname.split("/");
  const [roomsSelected, setRoomsSelected] = useState(new Map());
  const [listRoomsSelected, setListRoomsSelected] = useState([{} as IRoomSelected])
  const [childState, setChildState] = useState(roomSelected);
  const [images, setImages] = useState([]);
  const [residenceInfo, setResidenceInfo] = useState({} as IResidenceInfo);
  const [rooms, setRooms] = useState(rooms_demo);
  const [comments, setComments] = useState({} as ICommentResponse)

  useEffect(() => {
    if(childState.id !== "") {
      if(childState.selected === true) {
        roomsSelected.set(childState.id, true);
        const room = rooms.filter(room => room.roomTypeId.toString() === childState.id)
        setListRoomsSelected(data => [...data, {
          roomTypeId: room[0].roomTypeId,
          name: room[0].name,
          maxQuantity: room[0].quantity,
          currentQuantity: room[0].quantity > 0 ? 1 : 0,
          price: room[0].price
        }]);
      } else {
        const remove = listRoomsSelected.filter(room => room.roomTypeId.toString() !== childState.id);
        roomsSelected.delete(childState.id);
        setListRoomsSelected(remove);
      }
    } else {
      setListRoomsSelected([]);
    }
  }, [childState])

  const onChangeQuantity = (roomTypeId: number, quantity: number) => {
    if(quantity === 0) {
      const remove = listRoomsSelected.filter(room => room.roomTypeId.toString() !== childState.id);
      roomsSelected.delete(childState.id);
      setListRoomsSelected(remove);
      return;
    }
    const rooms = listRoomsSelected.map(room => {
      if(room.roomTypeId === roomTypeId) {
        room.currentQuantity = quantity
        return room;
      } else return room;
    })
    setListRoomsSelected(rooms)
  }

  // useEffect(() => {
  //   console.log(listRoomsSelected);
  // }, [listRoomsSelected])

  useEffect(() => {
    getImages();
    getResidence();
    // getComments(residenceInfo.residenceId);
  }, [])

  useEffect(() => {
    console.log(comments);
  }, [comments])


  useEffect(() => {
    if(residenceInfo.residenceId !== undefined && residenceInfo.residenceId !== null) {
      callComments(residenceInfo.residenceId)
    }
  }, [residenceInfo?.residenceId])

  useEffect(() => {
    getRooms();
  }, [checkin, checkout])

  async function getImages() {
    const images = await getImageResidence(Number(pathSplit[pathSplit.length-1]));
    setImages(images);
  }

  async function getResidence() {
    const residenceInfo = await getResidenceInfo(Number(pathSplit[pathSplit.length-1]));
    setResidenceInfo(residenceInfo)
  }

  async function getRooms() {
    const rooms = await getRoomBanner(Number(pathSplit[pathSplit.length-1]), `?checkin=${checkin}&checkout=${checkout}`);
    setRooms(rooms);
  }

  async function callComments(residenceId: number) {
    const response = await getComments(residenceId);
    setComments(response);
  }

  const handleOpenModalImageGallery = () => {
    // router(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
    window.location.href = `${window.location.pathname}?modal=PHOTO_TOUR_SCROLLABLE`;
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
        {residenceInfo.type === 'HOTEL' && <Badge name='Khách sạn' color='green' />}
        {residenceInfo.type === 'HOMESTAY' && <Badge name='Homestay' color='purple' />}
        {residenceInfo.type === 'VILLA' && <Badge name='Villa' color='red' />}
        {residenceInfo.type === 'HOME' && <Badge name='Nhà nguyên căn' color='yellow' />}
          {/* <Badge name={residenceInfo.type} /> */}
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {residenceInfo.name}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating point={residenceInfo.rating} reviewCount={residenceInfo.reviews}/>
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">{residenceInfo.address}</span>
          </span>
        </div>

        {/* 4 */}
        {/* <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              Kevin Francis
            </span>
          </span>
        </div> */}

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {/* {Amenities_demos.filter((_, i) => i < 12).map((item) => ( */}
          {residenceInfo ? residenceInfo?.facilities?.map((item) => (
            <div key={item.amenitiesId} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=" ">{item.amenitiesName}</span>
            </div>
          )) : <></>}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          {/* <h4 className="text-lg font-semibold">Thời gian nhận trả phòng</h4> */}
          <h2 className="text-2xl font-semibold">Thời gian nhận trả phòng</h2>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Thời gian nhận</span>
              <span>{residenceInfo.checkin}</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Thời gian trả</span>
              <span>{residenceInfo.checkout}</span>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold">Thông tin mô tả</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>{residenceInfo.description}</span>
          {/* <span>
            Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
            accommodation, an outdoor swimming pool, a bar, a shared lounge, a
            garden and barbecue facilities. Complimentary WiFi is provided.
          </span>
          <br />
          <br />
          <span>
            There is a private bathroom with bidet in all units, along with a
            hairdryer and free toiletries.
          </span>
          <br /> <br />
          <span>
            The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental
            service and a car rental service are available at the accommodation,
            while cycling can be enjoyed nearby.
          </span> */}
        </div>
      </div>
    );
  };

  // const renderSection3 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       <div>
  //         <h2 className="text-2xl font-semibold">Amenities </h2>
  //         <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  //           {` About the property's amenities and services`}
  //         </span>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
  //       {/* 6 */}
  //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
  //         {Amenities_demos.filter((_, i) => i < 12).map((item) => (
  //           <div key={item.name} className="flex items-center space-x-3">
  //             <i className={`text-3xl las ${item.icon}`}></i>
  //             <span className=" ">{item.name}</span>
  //           </div>
  //         ))}
  //       </div>

  //       {/* ----- */}
  //       <div className="w-14 border-b border-neutral-200"></div>
  //       <div>
  //         <ButtonSecondary onClick={openModalAmenities}>
  //           View more 20 amenities
  //         </ButtonSecondary>
  //       </div>
  //       {renderMotalAmenities()}
  //     </div>
  //   );
  // };

  // const renderMotalAmenities = () => {
  //   return (
  //     <Transition appear show={isOpenModalAmenities} as={Fragment}>
  //       <Dialog
  //         as="div"
  //         className="fixed inset-0 z-50 overflow-y-auto"
  //         onClose={closeModalAmenities}
  //       >
  //         <div className="min-h-screen px-4 text-center">
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0"
  //             enterTo="opacity-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
  //           </Transition.Child>

  //           {/* This element is to trick the browser into centering the modal contents. */}
  //           <span
  //             className="inline-block h-screen align-middle"
  //             aria-hidden="true"
  //           >
  //             &#8203;
  //           </span>
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0 scale-95"
  //             enterTo="opacity-100 scale-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100 scale-100"
  //             leaveTo="opacity-0 scale-95"
  //           >
  //             <div className="inline-block py-8 h-screen w-full max-w-4xl">
  //               <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
  //                 <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
  //                   <h3
  //                     className="text-lg font-medium leading-6 text-gray-900"
  //                     id="headlessui-dialog-title-70"
  //                   >
  //                     Amenities
  //                   </h3>
  //                   <span className="absolute left-3 top-3">
  //                     <ButtonClose onClick={closeModalAmenities} />
  //                   </span>
  //                 </div>
  //                 <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
  //                   {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
  //                     <div
  //                       key={item.name}
  //                       className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
  //                     >
  //                       <i
  //                         className={`text-4xl text-neutral-6000 las ${item.icon}`}
  //                       ></i>
  //                       <span>{item.name}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //           </Transition.Child>
  //         </div>
  //       </Dialog>
  //     </Transition>
  //   );
  // };

  // const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 3);

  const renderCard = (room: IRoomBanner, index: number) => {
    return <PropertyCard key={index} className="h-full" data={room} setChildState={setChildState} />;
  };
  // const renderSection4 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <div>
  //         <h2 className="text-2xl font-semibold">Room Rates </h2>
  //         <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  //           Prices may increase on weekends or holidays
  //         </span>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
  //       {/* CONTENT */}
  //       <div className="flow-root">
  //         <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
  //           <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
  //             <span>Monday - Thursday</span>
  //             <span>$199</span>
  //           </div>
  //           <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
  //             <span>Monday - Thursday</span>
  //             <span>$199</span>
  //           </div>
  //           <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
  //             <span>Friday - Sunday</span>
  //             <span>$219</span>
  //           </div>
  //           <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
  //             <span>Rent by month</span>
  //             <span>-8.34 %</span>
  //           </div>
  //           <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
  //             <span>Minimum number of nights</span>
  //             <span>1 night</span>
  //           </div>
  //           <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
  //             <span>Max number of nights</span>
  //             <span>90 nights</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderSection5 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <h2 className="text-2xl font-semibold">Host Information</h2>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

  //       {/* host */}
  //       <div className="flex items-center space-x-4">
  //         <Avatar
  //           hasChecked
  //           hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
  //           sizeClass="h-14 w-14"
  //           radius="rounded-full"
  //         />
  //         <div>
  //           <a className="block text-xl font-medium" href="##">
  //             Kevin Francis
  //           </a>
  //           <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
  //             <StartRating />
  //             <span className="mx-2">·</span>
  //             <span> 12 places</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* desc */}
  //       <span className="block text-neutral-6000 dark:text-neutral-300">
  //         Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
  //         accommodation, an outdoor swimming pool, a bar, a shared lounge, a
  //         garden and barbecue facilities...
  //       </span>

  //       {/* info */}
  //       <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
  //         <div className="flex items-center space-x-3">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  //             />
  //           </svg>
  //           <span>Joined in March 2016</span>
  //         </div>
  //         <div className="flex items-center space-x-3">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
  //             />
  //           </svg>
  //           <span>Response rate - 100%</span>
  //         </div>
  //         <div className="flex items-center space-x-3">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={1.5}
  //               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  //             />
  //           </svg>

  //           <span>Fast response - within a few hours</span>
  //         </div>
  //       </div>

  //       {/* == */}
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
  //       <div>
  //         <ButtonSecondary href="/author">See host profile</ButtonSecondary>
  //       </div>
  //     </div>
  //   );
  // };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Số lượt đánh giá ({residenceInfo.reviews} đánh giá)</h2>
        <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" defaultPoint={Math.ceil(residenceInfo.rating)}/>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* Content */}
        {/* <div className="space-y-2">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div> */}

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {
            comments.data && comments.data.map((com, index) => (<CommentListing key={index} className="py-8" data={com}/>))
          }
          {/* <CommentListing className="py-8" /> */}
          <div className="pt-8">
            {/* <ButtonSecondary>View more 20 reviews</ButtonSecondary> */}
            <div className="flex justify-center items-center mb-8 lg:mb-11">
              <Pagination currentPage={comments.currentPage} totalPage={comments.totalPage}/>
            </div>
          </div>
        </div>
        {/* <div className="divide-y divide-neutral-100 dark:divide-neutral-800"></div> */}
      </div>
    );
  };

  // const renderSection7 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <div>
  //         <h2 className="text-2xl font-semibold">Location</h2>
  //         <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  //           San Diego, CA, United States of America (SAN-San Diego Intl.)
  //         </span>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

  //       {/* MAP */}
  //       <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
  //         <div className="rounded-xl overflow-hidden z-0">
  //           <iframe
  //             title="x"
  //             width="100%"
  //             height="100%"
  //             loading="lazy"
  //             allowFullScreen
  //             referrerPolicy="no-referrer-when-downgrade"
  //             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
  //           ></iframe>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  // const renderSection8 = () => {
  //   return (
  //     <div className="listingSection__wrap">
  //       {/* HEADING */}
  //       <h2 className="text-2xl font-semibold">Things to know</h2>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

  //       {/* CONTENT */}
  //       <div>
  //         <h4 className="text-lg font-semibold">Cancellation policy</h4>
  //         <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
  //           Refund 50% of the booking value when customers cancel the room
  //           within 48 hours after successful booking and 14 days before the
  //           check-in time. <br />
  //           Then, cancel the room 14 days before the check-in time, get a 50%
  //           refund of the total amount paid (minus the service fee).
  //         </span>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

  //       {/* CONTENT */}
  //       <div>
  //         <h4 className="text-lg font-semibold">Check-in time</h4>
  //         <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
  //           <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
  //             <span>Check-in</span>
  //             <span>08:00 am - 12:00 am</span>
  //           </div>
  //           <div className="flex space-x-10 justify-between p-3">
  //             <span>Check-out</span>
  //             <span>02:00 pm - 04:00 pm</span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

  //       {/* CONTENT */}
  //       <div>
  //         <h4 className="text-lg font-semibold">Special Note</h4>
  //         <div className="prose sm:prose">
  //           <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
  //             <li>
  //               Ban and I will work together to keep the landscape and
  //               environment green and clean by not littering, not using
  //               stimulants and respecting people around.
  //             </li>
  //             <li>Do not sing karaoke past 11:30</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderSidebar = () => {
    async function onBooking() {
      const cart: ICartStorage = {
        expiry: getBefore1HourMilliseconds(),
        residenceId: residenceInfo.residenceId,
        checkin: checkin,
        checkout: checkout,
        roomList: listRoomsSelected
      };
      localStorage.setItem("cart", JSON.stringify(cart))
      await checkToken();
      window.location.href = "/checkout";
    }

    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-xl font-semibold">
            {/* $119 */}
            Danh sách phòng đã chọn
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              {/* /night */}
              {/* Danh sách phòng đã chọn */}
            </span>
          </span>
          {/* <StartRating /> */}
        </div>

        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput className="flex-1 z-[11]" 
            start={checkin !== undefined ? new Date(checkin) : getDateTomorrow()} 
            end={ checkout !== undefined ? new Date(checkout) : getDateAfterTomorrow()}/>
          {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* <GuestsInput className="flex-1" /> */}
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$119 x 3 night</span>
            <span>$357</span>
          </div> */}
          {/* <div>
            <div className="flex justify-between columns-3 text-neutral-6000 dark:text-neutral-300">
              <span>Phòng giường đôi view VIP VIP</span>
              <span className="p-2"></span>
              <span>1.000.000</span>
            </div>
              <NcInputNumber className="w-full" label="Số lượng" min={1} defaultValue={4} desc={'Còn 3 phòng'}/>
          </div> */}
          { listRoomsSelected.map(room => (
            <div key={getCurrentMilliseconds()+room.roomTypeId}>
              {/* <div className="flex justify-center">
                <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>
              </div> */}
              <div>
                <div className="flex justify-between columns-3 text-neutral-6000 dark:text-neutral-300">
                  <span>{room.name}</span>
                  <span className="p-2"></span>
                  <span>{formatMoney(room.price ?? '')}</span>
                </div>
                  <NcInputNumber className="w-full" 
                    label="Số lượng" min={1} 
                    max={room.maxQuantity} 
                    defaultValue={room.currentQuantity} 
                    desc={`Còn ${room.maxQuantity} phòng`} 
                    onChange={e => onChangeQuantity(room.roomTypeId, e.valueOf())}/>
              </div>
            </div>
            ))
          }
          {/* <div className="flex justify-center">
            <div className="w-24 border-b border-neutral-200 dark:border-neutral-700"></div>
          </div>
          <div>
            <div className="flex justify-between columns-3 text-neutral-6000 dark:text-neutral-300">
              <span>Phòng giường đôi view VIP VIP</span>
              <span className="p-2"></span>
              <span>1.000.000</span>
            </div>
              <NcInputNumber className="w-full" label="Số lượng" min={1} defaultValue={4} desc={'Còn 3 phòng'}/>
          </div> */}
          
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Đã bao gồm VAT</span>
            <span>{getDateDiff(checkin, checkout)} Đêm</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-red-400">Tổng cộng</span>
            <span>{formatMoney(listRoomsSelected.reduce((total, data) => total = total + data.price*data.currentQuantity, 0) * getDateDiff(checkin, checkout))} VNĐ</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary type="button" onClick={onBooking} disabled={listRoomsSelected.length === 0}>Đặt phòng</ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
            onClick={handleOpenModalImageGallery}
          >
            <img
              className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
              src={images[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {images.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                index >= 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <img
                  className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                  src={item || ""}
                  alt=""
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {/* {renderSection8()} */}

          {/* {renderSection3()} */}
          {/* {renderSection4()} */}
          <SectionDateRange checkin={checkout ?? getDateTomorrowFormatYYYYMMDD()} checkout={checkin ?? getDateTomorrowFormatYYYYMMDD()}/>
          <div
            className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-1`}
          >
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Danh sách phòng</span>
              <span>{`${getDateFormatDDMM(new Date(checkin))} - ${getDateFormatDDMM(new Date(checkout))}`}</span>
            </div>
            {rooms?.map((room, index) => renderCard(room, index))}
          </div>
          {/* {renderSection5()} */}
          {renderSection6()}
          {/* <div className="space-y-2"></div> */}
          {/* {renderSection7()} */}
        </div>


        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default function ListingStayDetailPage() {
  return (
    <DetailPagetLayout>
      <StayDetailPageContainer />
    </DetailPagetLayout>
  );
}
