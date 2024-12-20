import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { residenceToValueList } from "contains/map";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Nơi ở",
  subHeading = "Top 8 nơi ở được sắp xếp theo số lượng đặt phòng nhiều nhất trong tháng",
  headingIsCenter,
  tabs = residenceToValueList(),
}) => {
  const renderCard = (stay: StayDataType) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={tabs[0]}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {DEMO_DATA.map((stay) => renderCard(stay))}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
