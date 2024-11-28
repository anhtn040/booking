import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionHero3 from "components/SectionHero/SectionHero3";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";

// All service.
// Hotel.
// Tour.
// Tour Guide.
// Tour Service.

function HomePage() {
	return (
		<div className="nc-PageHome relative overflow-hidden">
			{/* BACKGROUND GLASSMOPHIN */}
			<BgGlassmorphism />
			{/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div>
			
			<div className="container relative space-y-24 mb-24 ">
				{/* SECTION ALL SERVICES*/}
				<SectionGridCategoryBox />

				{/* SECTION HOTELS*/}
				<div className="relative py-16">
					{/* <BackgroundSection /> */}
					<SectionGridFeaturePlaces />
				</div>
				
				{/* SECTION TOURS*/}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeatureProperty />
        </div> */}

				{/* SECTION TOUR GUIDE*/}
				<div className="relative py-16">
					{/* <BackgroundSection /> */}
					<SectionGridAuthorBox boxCard="box2" />
				</div>
				
				{/* SECTION TOUR SERVICE*/}
				<SectionHowItWork />

			</div>
    </div>
	);
}

export default HomePage;