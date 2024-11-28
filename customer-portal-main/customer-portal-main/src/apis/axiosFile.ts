import axios from "axios";
import { constants } from "contains/contants";
import { IAxiosCustom, IDataResponse } from "./axiosCustom";

async function axiosFile(config: IAxiosCustom): Promise<IDataResponse> {
  let response = await axios({
    method: config.method,
    url: constants.HOST+config.uri,
    headers: {
      "Content-type": "multipart/form-data",
    },
    params: config.params,
    data: config.data
  })
  .then(res => {
    const response: IDataResponse = {
      status: true,
      data: res.data
    }
    return response;
  })
  .catch(() => {
    const response: IDataResponse = {
      status: false,
      data: "Hình ảnh không được quá 5MB"
    }
    return response;
  })
  return response as IDataResponse;
}
export default axiosFile;