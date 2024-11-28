import axios from "axios";
import { constants } from "contains/contants";

export interface IAxiosCustom {
  method: string,
  uri: string,
  params: {} | null,
  data: {} | null,
}

export interface IDataResponse {
  status: boolean,
  data: any
}

async function axiosCustom(config: IAxiosCustom): Promise<IDataResponse> {
  let response = await axios({
    method: config.method,
    url: constants.HOST+config.uri,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    params: config.params,
    data: config.data
  })
  .then((res) => {
    const data: IDataResponse = {
      status: true,
      data: res.data
    }
    return data;
  })
  .catch(async (err) => {
    if(err.response.status === 401) {
      const responseRefresh = await axios({
        method: 'POST',
        url: `${constants.HOST}/v1/pub/refresh`,
        data: {
          "refreshToken": localStorage.getItem('refreshToken')
        }
      })
      .then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      })
      .then(async () => {
        let response = await axios({
          method: config.method,
          url: constants.HOST+config.uri,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          params: config.params,
          data: config.data
        })
        .then((res) => {
          const data: IDataResponse = {
            status: true,
            data: res.data
          }
          return data;
        })
        .catch(err => {
          window.location.href = "/login";
          const data: IDataResponse = {
            status: false,
            data: err.response.data
          }
          return data;
        })
        return response;
      })
      .catch((err) => {
        window.location.href = '/login';
        const data: IDataResponse = {
          status: false,
          data: err.response.data
        }
        return data;
      })
      return responseRefresh;
    } else {
      const data: IDataResponse = {
        status: false,
        data: err.response.data
      }
      return data;
    }
  })
  return response as IDataResponse;
}

export default axiosCustom;