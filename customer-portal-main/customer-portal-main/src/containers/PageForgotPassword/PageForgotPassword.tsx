import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { IForgotPassword } from "apis/public/account/interface";
import { forgotPassword } from "apis/public/account/account";
import { notification } from "antd";
import {constants} from "../../contains/contants";

export interface PageForgotPassowordProps {
  className?: string;
}

const PageSignUp: FC<PageForgotPassowordProps> = ({ className = "" }) => {

  const [forgotPasswordForm, setForgotPasswordForm] = useState({token: window.location.href} as IForgotPassword);
  const [passwordMessage, setPasswordMessage] = useState("Mật khẩu không bỏ trống");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("Nhập lại mật khẩu không bỏ trống");

  const onChangePassword = (passwordField: string) => {
    if(passwordField) {
      setForgotPasswordForm(preData => ({...preData, newPassword: passwordField}))
      if(passwordField.length < 6 || passwordField.length > 20) {
        setPasswordMessage("Mật khẩu từ 6 - 20 ký tự.");
      } else {
        if(passwordField === forgotPasswordForm.confirmPassword) {
          setPasswordConfirmMessage("");
        }
        setPasswordMessage("");
      }
    } else {
      setPasswordMessage("Mật khẩu không bỏ trống")
    }
  }
  const onChangePasswordConfirm = (passwordConfirmField: string) => {
    if(passwordConfirmField) {
      setForgotPasswordForm(preData => ({...preData, confirmPassword: passwordConfirmField}))
      if(passwordConfirmField !== forgotPasswordForm.newPassword) {
        setPasswordConfirmMessage("Mật khẩu nhập lại không khớp.");
      } else {
        setPasswordConfirmMessage("");
      }
    } else {
      setPasswordConfirmMessage("Nhập lại mật khẩu không bỏ trống");
    }
  }
  const isDisable = () => {
    if( passwordMessage || passwordConfirmMessage) {
      return true;
    }
    return false;
  }
  async function onSubmit() {
    const request = forgotPasswordForm;
    request.token = request.token.substring("http://localhost:3000/forgot-password/".length)
    
    const response = await forgotPassword(request);
    if(response.status === false) {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: response.data
      });
    } else {
      // window.location.href = "/login";
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: 'Đổi mật khẩu thành công.'
      });
    }
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Quên mật khẩu
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <form className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Mật khẩu mới
              </span>
              <Input 
                type="password" 
                minLength={6}
                maxLength={20}
                className="mt-1"
                onChange={e => onChangePassword(e.target.value)}/>
              {passwordMessage && <span className="flex justify-end text-sm mt-2 text-red-500">{passwordMessage}</span>}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Nhập lại mật khẩu
              </span>
              <Input 
                type="password" 
                minLength={6}
                maxLength={20}
                className="mt-1"
                onChange={e => onChangePasswordConfirm(e.target.value)}
              />
              {passwordConfirmMessage && <span className="flex justify-end text-sm mt-2 text-red-500">{passwordConfirmMessage}</span>}
            </label>
            <ButtonPrimary type="button" disabled={isDisable()} onClick={onSubmit}>Cập nhật mật khẩu</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Tôi đã có tài khoản? {` `}
            <Link to={`${constants.PREFIX}/login`} className="underline">Đăng nhập</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
