import React, { useEffect, useState } from "react";
import CommonLayout from "./CommonLayout";
// import Pagination from "shared/Pagination/Pagination";
import FlightCard from "components/FlightCard/FlightCard";
import { getBooking } from "apis/auth/me/meApi";
import { IBookingResponse } from "apis/auth/me/interface";

// const DEMO_DATA: FlightCardProps["data"][] = [
//   {
//     id: "1",
//     price: "$4,100",
//     airlines: {
//       // logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
//       logo: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/336110451.jpg?k=91bdd3eb0e84d6364d7168ce7ba2d385d7db42e51e12e5cb0bf8f199d37e92a3&o=&hp=1",
//       name: "Korean Air",
//     },
//   },
//   {
//     id: "2",
//     price: "$3,380",
//     airlines: {
//       // logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
//       logo: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467552291.jpg?k=83a9c26f7d6f82e903ab9cbb53861d188066d65d541bf10758b45778d80dac93&o=&hp=1",
//       name: "Singapore Airlines",
//     },
//   },
//   {
//     id: "3",
//     price: "$2,380",
//     airlines: {
//       // logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
//       logo: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/463552516.jpg?k=892e54f2b13835167cee6a56e0f12ab9cbeced09444e66505135907c6521962e&o=&hp=1",
//       name: "Philippine Airlines",
//     },
//   },
// ];

const AccountBilling = () => {

  const [bookings, setBookings] = useState({} as IBookingResponse)

  useEffect(() => {
    getBookingMe();
  }, [])

  const getBookingMe = async () => {
    const response = await getBooking();
    setBookings(response);
  }

  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Lịch sử đơn đặt</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          
          <div
            // className={`nc-SectionGridFilterCard`}
            // data-nc-id="SectionGridFilterCard"
          >
            {bookings.data && bookings.data.map((item, index) => (
              <FlightCard className="mt-4" defaultOpen={!index} key={index} data={item} />
            ))}
          </div>

          <div className="flex justify-center">
            {/* <Pagination totalPage={1}/> */}
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountBilling;
