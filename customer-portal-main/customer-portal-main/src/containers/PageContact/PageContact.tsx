import React, { FC } from "react";
import { Helmet } from "react-helmet";
// import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SocialsList from "shared/SocialsList/SocialsList";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
// import SectionClientSay from "components/SectionClientSay/SectionClientSay";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "🗺 ĐỊA CHỈ",
    desc: "138 Hùng Vương, xã Ngũ Phụng, huyện Phú Quý, tỉnh Bình Thuận",
  },
  {
    title: "💌 EMAIL",
    desc: "sangdoannguyen7@gmail.com",
  },
  {
    title: "☎ ĐIỆN THOẠI + ZALO",
    desc: "033-442-8102",
  },
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>Contact || Booking React Template</title>
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Liên hệ
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 Mạng xã hội
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <Label>Họ tên</Label>
                  <Input
                    placeholder="Nguyễn Thanh Sang"
                    type="text"
                    className="mt-1"
                  />
                </label>

                <label className="block">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="sangdoannguyen7@gmail.com"
                    className="mt-1"
                  />
                </label>

                <label className="block">
                  <Label>Số điện thoại</Label>
                  <Input
                    type="text"
                    placeholder="0334428102"
                    className="mt-1"
                  />
                </label>

                <label className="block">
                  <Label>Nội dung</Label>

                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit">Gửi tin nhắn</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      {/* <div className="container">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="Pagecontact_" />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-32" />
      </div> */}
    </div>
  );
};

export default PageContact;
