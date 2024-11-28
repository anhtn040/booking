import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { IUpdateInfoMe, IUserResponse } from "apis/auth/me/interface";
import { getUserMe, updateInfo } from "apis/auth/me/meApi";
import { notification } from "antd";
import AvatarCustom from "shared/Avatar/AvatarCustom";
import { uploadAFile } from "apis/public/images/imageApi";
import {message, messageMap} from "../../contains/contants";
export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  const [infoMe, setInfoMe] = useState({} as IUserResponse);

  useEffect(() => {
    getInfoMe();
  }, [])
  async function getInfoMe() {
    const infoMe = await getUserMe();
    setInfoMe(infoMe);
  }
  function onChangeGender(gender: string) {
    setInfoMe(preData => ({...preData, gender: gender}));
  }
  function onChangeFullname(fullName: string) {
    setInfoMe(preData => ({...preData, fullname: fullName}));
    if(fullName.length === 0) {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: message.EMPTY_NAME
      });
    }
  }
  async function onUpdate() {
    const infoUpdate: IUpdateInfoMe = {
      gender: infoMe.gender,
      fullname: infoMe.fullname,
      avatar: infoMe.avatar
    }
    const response = await updateInfo(infoUpdate);
    if(!response.status) {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: messageMap.get(response.data)
      });
    } else {
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: message.UPDATE_SUCCESS
      });
    }
  }
  async function onChangeImage(image: any) {
    const response = await uploadAFile(image[0]);
    if(response.status) {
      setInfoMe(preData => ({...preData, avatar: response.data}))
    }
  }

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          {/* <h2 className="text-3xl font-semibold">Account infomation</h2> */}
          {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <AvatarCustom sizeClass="w-32 h-32" imgUrl={infoMe?.avatar} userName={infoMe?.fullname}/>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* <span className="mt-1 text-xs">Change Image</span> */}
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(image) => onChangeImage(image.target.files)}
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" defaultValue={infoMe?.email} disabled/>
              </div>
              {/* ---- */}
              <div>
                <Label>Giới tính</Label>
                <Select className="mt-1.5" value={infoMe?.gender} onChange={(e) => onChangeGender(e.target.value)}>
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                  <option value="OTHER">Khác</option>
                </Select>
              </div>
              {/* ---- */}
              <div>
                <Label>Họ tên</Label>
                <Input className="mt-1.5" defaultValue={infoMe?.fullname} onChange={(e) => onChangeFullname(e.target.value)}/>
              </div>
              {/* <div>
                <Label>About you</Label>
                <Textarea className="mt-1.5" defaultValue="..." />
              </div> */}
              <div className="pt-2">
                <ButtonPrimary type="button" onClick={onUpdate}>Cập nhật thông tin</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
