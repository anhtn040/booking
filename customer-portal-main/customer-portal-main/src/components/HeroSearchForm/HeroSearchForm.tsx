"use client";

import React, { FC } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-4xl py-5 lg:py-10 ${className}`}
    >
      {/* {renderTab()} */}
      {/* {renderForm()} */}
      <StaySearchForm />
    </div>
  );
};

export default HeroSearchForm;
