import axiosCustom, { IDataResponse } from "apis/axiosCustom";
import { ICommentResponse, IResidenceInfo, IResidenceResponse, IRoomBanner } from "./interface";

export async function getAllResidence(search: string): Promise<IResidenceResponse> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/pub/residences${search}`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IResidenceResponse;
}
export async function getImageResidence(residenceId: number): Promise<any> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/pub/residences/${residenceId}/images`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as string[];
}
export async function getAllImageResidence(residenceId: number): Promise<any> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/pub/residences/${residenceId}/images/all`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as string[];
}
export async function getResidenceInfo(residenceId: number): Promise<IResidenceInfo> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/pub/residences/${residenceId}`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IResidenceInfo;
}
export async function getRoomBanner(residenceId: number, search: string): Promise<IRoomBanner[]> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/pub/residences/${residenceId}/rooms${search}`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as IRoomBanner[];
}
export async function getComments(residenceId: number): Promise<ICommentResponse> {
  const response = await axiosCustom({
    method: 'GET',
    uri: `/v1/pub/residences/${residenceId}/comments`,
    data: null,
    params: null
  }) as IDataResponse;
  return response.data as ICommentResponse;
}
