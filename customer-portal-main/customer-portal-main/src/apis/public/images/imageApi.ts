import { IDataResponse } from "apis/axiosCustom";
import axiosFile from "apis/axiosFile";

export async function uploadAFile(file: any): Promise<IDataResponse> {
  
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosFile({
    method: 'POST',
    uri: `/v1/pub/images`,
    data: formData,
    params: null
  }) as IDataResponse;
  return response;
}