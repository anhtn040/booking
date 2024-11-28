import React, { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingImageGallery from "components/ListingImageGallery/ListingImageGallery";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import { getAllImageResidence } from "apis/public/residences/residenceApi";
import { ListingGalleryImage } from "components/ListingImageGallery/utils/types";

const DetailPagetLayout = ({ children }: { children: ReactNode }) => {
  // const navigate = useNavigate();
  const pathSplit = window.location.pathname.split("/");
  const [searchParams] = useSearchParams();
  const modal = searchParams?.get("modal");
  const [images, setImages] = useState([]);

  const handleCloseModalImageGallery = () => {
    window.location.href = `${window.location.pathname}`;
  };

  useEffect(() => {
    getAllImages();
  }, [])

  async function getAllImages() {
    const images = await getAllImageResidence(Number(pathSplit[pathSplit.length-1]));
    setImages(images);
  }

  return (
    // <div className="ListingDetailPage">
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={
          images.map(
            (item, index): ListingGalleryImage => {
              return {
                id: index,
                url: item,
              };
            }
          )
        }
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      {/* <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingDetailPage"
          />
        </div>
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div> */}

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailPagetLayout;
