import axiosCustom, { IDataResponse } from "apis/axiosCustom";
import { IBookingForm, IBookingResponse, IHasPermission, IReviewRequest, IUpdateInfoMe, IUpdatePassword, IUserResponse } from "./interface";
import { IResidenceResponse } from "apis/public/residences/interface";

export async function checkToken(): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'POST',
    uri: `/v1/me`,
    data: null,
    params: null
  }) as IDataResponse;
  return response;
}
export async function getUserMe(): Promise<IUserResponse> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/me/info`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IUserResponse;
}
export async function updateInfo(infoMe: IUpdateInfoMe): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'PATCH',
    uri: `/v1/me/update`,
    data: infoMe,
    params: null
  }) as IDataResponse;
  return response;
}
export async function hasPermission(): Promise<IHasPermission> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/me`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IHasPermission;
}
export async function updatePassword(formUpdate: IUpdatePassword): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'PATCH',
    uri: `/v1/me/change-password`,
    data: formUpdate,
    params: null
  }) as IDataResponse;
  return response;
}
export async function bookingResidence(formBooking: IBookingForm): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'POST',
    uri: `/v1/me/booking`,
    data: formBooking,
    params: null
  }) as IDataResponse;
  return response;
}
export async function getBooking(): Promise<IBookingResponse> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/me/booking`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IBookingResponse;
}
export async function getFavorites(): Promise<IResidenceResponse> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/me/favorites`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IResidenceResponse;
}
export async function updateFavorites(residenceId: number): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'PUT',
    uri: `/v1/me/favorites/${residenceId}`,
    data: null,
    params: null
  }) as IDataResponse;
  return response;
}
export async function review(review: IReviewRequest): Promise<IDataResponse> {
  const response = await axiosCustom({
    method: 'PUT',
    uri: `/v1/me/rating`,
    data: review,
    params: null
  }) as IDataResponse;
  return response;
}