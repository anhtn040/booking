import axiosCustom, { IDataResponse } from "apis/axiosCustom";
import { IForgotPassword, IGetCode, ILoginForm, IRegisterForm } from "./interface";

export async function register(register: IRegisterForm): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'POST',
    uri: `/v1/pub/register`,
    data: register,
    params: null
  });
  return response;
}
export async function login(login: ILoginForm): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'POST',
    uri: `/v1/pub/login`,
    data: login,
    params: null
  });
  return response;
}
export async function getCodeEmail(form: IGetCode): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'POST',
    uri: `/v1/pub/get-code`,
    data: form,
    params: null
  });
  return response;
}
export async function forgotPassword(forgotPassword: IForgotPassword): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'PATCH',
    uri: `/v1/pub/forgot-password`,
    data: forgotPassword,
    params: null
  });
  return response;
}