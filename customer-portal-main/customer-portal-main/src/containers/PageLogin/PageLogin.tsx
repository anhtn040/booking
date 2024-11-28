import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Button, Input as Input2, Modal, Space, notification } from "antd";
import { ILoginForm } from "apis/public/account/interface";
import { getCodeEmail, login } from "apis/public/account/account";
import { ICartStorage } from "apis/public/residences/interface";
import { getCurrentMilliseconds } from "utils/dateHandle";
import {constants} from "../../contains/contants";

export interface PageLoginProps {
  className?: string;
}

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Continue with Twitter",
//     href: "#",
//     icon: twitterSvg,
//   },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cart");
  }, [])

  const [loginForm, setLoginForm] = useState({} as ILoginForm);

  const onChangeEmail = (email: string) => {
    setLoginForm(preData => ({...preData, email: email}));
  }
  const onChangePassword = (password: string) => {
    setLoginForm(preData => ({...preData, password: password}));
  }
  async function onSubmit (){
    const response = await login(loginForm);
    console.log(response);
    if(response.status === false) {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: 'Email hoặc mật khẩu không đúng.'
      });
    } else {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      if(localStorage.getItem("cart") !== null) {
        const cart = JSON.parse(localStorage.getItem("cart") ?? "") as ICartStorage;
        if(cart.expiry >= getCurrentMilliseconds()) {
          window.location.href = "/checkout";
          return;
        }
        localStorage.removeItem("cart");
      }
      window.location.href = "/residences";
    }
  }
  async function onClickGetCode() {
    const response = await getCodeEmail({email: email});
    if(response.status) {
      setIsOpen(false);
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: 'Kiểm tra email của bạn.'
      });
    } else {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: response.data
      });
    }
  }

  useEffect(() => {
    if(localStorage.getItem('cart') !== null) {
      const cart = JSON.parse(localStorage.getItem('cart') ?? "") as ICartStorage;
      if(cart.expiry >= getCurrentMilliseconds()) {
        notification.open({
          type: 'warning',
          message: 'Thông báo',
          description:
            'Vui lòng đăng nhập để có thể đặt phòng.'
        });
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, [])

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <Modal open={isOpen} closable={false} onCancel={() => setIsOpen(false)} footer={[
        <Button key="back" onClick={() => setIsOpen(false)}>
          Thoát
        </Button>
      ]}>
        <Space.Compact style={{ width: '100%' }}>
          <Input2
            placeholder="Vui lòng nhập email..."
            allowClear
            type="email"
            // enterButton="Search"
            size="large"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button size="large" danger onClick={onClickGetCode}>Quên mật khẩu</Button>
        </Space.Compact>
      </Modal>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Đăng nhập
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={e => onChangeEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Mật khẩu
              </span>
              <Input 
                type="password" 
                className="mt-1" 
                onChange={e => onChangePassword(e.target.value)}/>
            </label>
            <ButtonPrimary type="button" onClick={onSubmit}>Đăng nhập</ButtonPrimary>
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              <Button className="underline" onClick={() => setIsOpen(true)}>
                Quên mật khẩu?
              </Button>
              <Link to={`${constants.PREFIX}/register`} className="underline">Đăng ký tài khoản</Link>
            </span>
          </form>
          {/* <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Đăng ký tài khoản</Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
