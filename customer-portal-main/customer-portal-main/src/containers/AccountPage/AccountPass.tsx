import Label from "components/Label/Label";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { IUpdatePassword } from "apis/auth/me/interface";
import { updatePassword } from "apis/auth/me/meApi";
import { notification } from "antd";

const AccountPass = () => {

  const [updatePasswordForm, setUpdatePasswordForm] = useState({} as IUpdatePassword);
  const [currentPasswordMessage, setCurrentPasswordMessage] = useState("Mật khẩu hiện tại không bỏ trống");
  const [newPasswordMessage, setNewPasswordMessage] = useState("Mật khẩu mới không bỏ trống");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("Nhập lại mật khẩu không bỏ trống");
  const inputPattern = new RegExp(/^[a-zA-Z0-9]{6,20}$/);

  const onChangeCurrentPassword = (currentPasswordField: string) => {
    if(currentPasswordField) {
      setUpdatePasswordForm(preData => ({...preData, oldPassword: currentPasswordField}))
      if(!inputPattern.test(currentPasswordField)) {
        setCurrentPasswordMessage("Mật khẩu từ 6 - 20 ký tự và không chứa ký tự đặt biệt");
      } else {
        setCurrentPasswordMessage("");
      }
    } else {
      setCurrentPasswordMessage("Mật khẩu không bỏ trống")
    }
  }
  const onChangeNewPassword = (newPasswordField: string) => {
    console.log(newPasswordField, updatePasswordForm.confirmPassword)
    if(newPasswordField) {
      setUpdatePasswordForm(preData => ({...preData, newPassword: newPasswordField}))
      if(!inputPattern.test(newPasswordField)) {
        setNewPasswordMessage("Mật khẩu từ 6 - 20 ký tự và không chứa ký tự đặt biệt");
      } else {
        if(newPasswordField === updatePasswordForm.confirmPassword) {
          setConfirmPasswordMessage("");
        } else {
          setConfirmPasswordMessage("Mật khẩu nhập lại không khớp.");
        }
        setNewPasswordMessage("");
      }
    } else {
      setNewPasswordMessage("Mật khẩu không bỏ trống")
    }
  }
  const onChangeConfirmPassword = (passwordConfirmField: string) => {
    if(passwordConfirmField) {
      setUpdatePasswordForm(preData => ({...preData, confirmPassword: passwordConfirmField}))
      if(passwordConfirmField !== updatePasswordForm.newPassword) {
        setConfirmPasswordMessage("Mật khẩu nhập lại không khớp.");
      } else {
        setConfirmPasswordMessage("");
      }
    } else {
      setConfirmPasswordMessage("Nhập lại mật khẩu không bỏ trống");
    }
  }
  const disable = (): boolean => {
    return !(inputPattern.test(updatePasswordForm.oldPassword)
        && inputPattern.test(updatePasswordForm.newPassword)
        && inputPattern.test(updatePasswordForm.confirmPassword)
        && updatePasswordForm?.newPassword === updatePasswordForm.confirmPassword)
  }
  const onUpdatePassword = async () => {
    const response = await updatePassword(updatePasswordForm);
    if(response.status) {
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: response.data
      });
    } else {
      notification.open({
        type: 'error',
        message: 'Thông báo',
        description: "Đổi mật khẩu thành công."
      });
    }
  }

  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          {/* <h2 className="text-3xl font-semibold">Update your password</h2> */}
          {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
          <div className=" max-w-xl space-y-6">
            <div>
              <Label>Mật khẩu hiện tại</Label>
              <Input type="password" className="mt-1.5" 
                defaultValue={updatePasswordForm.oldPassword ?? ""}
                onChange={(e) => onChangeCurrentPassword(e.target.value)}/>
              {currentPasswordMessage && <span className="flex justify-end text-sm mt-2 text-red-500">{currentPasswordMessage}</span>}
            </div>
            <div>
              <Label>Mật khẩu mới</Label>
              <Input type="password" className="mt-1.5" 
                defaultValue={updatePasswordForm.newPassword ?? ""}
                onChange={(e) => onChangeNewPassword(e.target.value)}/>
              {newPasswordMessage && <span className="flex justify-end text-sm mt-2 text-red-500">{newPasswordMessage}</span>}
            </div>
            <div>
              <Label>Nhập lại mật khẩu</Label>
              <Input type="password" className="mt-1.5" 
                defaultValue={updatePasswordForm.confirmPassword ?? ""}
                onChange={(e) => onChangeConfirmPassword(e.target.value)} />
              {confirmPasswordMessage && <span className="flex justify-end text-sm mt-2 text-red-500">{confirmPasswordMessage}</span>}
            </div>
            <div className="pt-2">
              <ButtonPrimary type="button" disabled={disable()} onClick={onUpdatePassword}>Đổi mật khẩu</ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
