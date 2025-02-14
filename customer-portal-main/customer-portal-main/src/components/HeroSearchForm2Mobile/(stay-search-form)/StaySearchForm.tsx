import React, { useState } from "react";
import LocationInput from "../LocationInput";
import DatesRangeInput from "../DatesRangeInput";
import converSelectedDateToString from "utils/converSelectedDateToString";
import { useSearchParams } from "react-router-dom";
import { getDateFormatYYYYMMDD } from "utils/dateHandle";

const StaySearchForm = () => {
  //
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "dates" | "guests"
  >("location");
  //
  const [locationInputTo, setLocationInputTo] = useState("");
  // const [guestInput, setGuestInput] = useState<GuestsObject>({
  //   guestAdults: 0,
  //   guestChildren: 0,
  //   guestInfants: 0,
  // });
  // const [endDate] = useState<Date | null>(new Date());

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    checkin: searchParams.get('checkin'),
    checkout: searchParams.get('checkout'),
  });
  const [startDate] = useState<Date | null>(
    search?.checkin && search.checkin > getDateFormatYYYYMMDD(new Date()) ? new Date(search.checkin) : new Date()
  );
  const [endDate] = useState<Date | null>(
    search?.checkout && search.checkout > getDateFormatYYYYMMDD(new Date()) ? new Date(search.checkout) : new Date()
  );

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Nơi đến</span>
            <span>{locationInputTo || "Location"}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInputTo}
            onChange={(value) => {
              setLocationInputTo(value);
              setFieldNameShow("dates");
            }}
          />
        )}
      </div>
    );
  };

  const renderInputDates = () => {
    const isActive = fieldNameShow === "dates";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow("dates")}
          >
            <span className="text-neutral-400">Khi nào</span>
            <span>
              {startDate
                ? converSelectedDateToString([startDate, endDate])
                : "Add date"}
            </span>
          </button>
        ) : (
          <DatesRangeInput />
        )}
      </div>
    );
  };

  // const renderInputGuests = () => {
  //   const isActive = fieldNameShow === "guests";
  //   let guestSelected = "";
  //   if (guestInput.guestAdults || guestInput.guestChildren) {
  //     const guest =
  //       (guestInput.guestAdults || 0) + (guestInput.guestChildren || 0);
  //     guestSelected += `${guest} guests`;
  //   }

  //   if (guestInput.guestInfants) {
  //     guestSelected += `, ${guestInput.guestInfants} infants`;
  //   }

  //   return (
  //     <div
  //       className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
  //         isActive
  //           ? "rounded-2xl shadow-lg"
  //           : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
  //       }`}
  //     >
  //       {!isActive ? (
  //         <button
  //           className={`w-full flex justify-between text-sm font-medium p-4`}
  //           onClick={() => setFieldNameShow("guests")}
  //         >
  //           <span className="text-neutral-400">Who</span>
  //           <span>{guestSelected || `Add guests`}</span>
  //         </button>
  //       ) : (
  //         <GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
        {/*  */}
        {renderInputDates()}
        {/*  */}
        {/* {renderInputGuests()} */}
      </div>
    </div>
  );
};

export default StaySearchForm;
