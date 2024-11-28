import { notification } from "antd";
import { updateFavorites } from "apis/auth/me/meApi";
import React, { FC, useState } from "react";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  residenceId: number;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  residenceId = 0,
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  function onClickTym(residenceId: number) {
    setLikedState(!likedState);
    callUpdateFavorites(residenceId);
  }
  async function callUpdateFavorites(residenceId: number) {
    const response = await updateFavorites(residenceId);
    if(response.status) {
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: 'Cập nhật danh sách yêu thích thành công'
      });
    } else {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: response.data
      });
    }
  }

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={() => onClickTym(residenceId)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
