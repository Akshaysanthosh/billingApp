import axios from "axios";
import { ManageLocalStorage } from "../../src/Services/Localstorage"
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Accept"] = "application/json";
export const httpCall = (payload) => {
  let config = {};
  let token = ManageLocalStorage.get("token")
    ? ManageLocalStorage.get("token")
    : "";
  config.headers = { Authorization: "Bearer " + token };
  config.method = payload.method ? payload.method : "get";
  config.url = payload.url ? payload.url : "";
  config.data=payload.data
  return axios(config);
//   if(payload.method==='put'){
//     config.data=payload.data
//   }else{
//   config.data =JSON.stringify(payload.data);
//   }
//   return axios(config);
}

export const setBaseUrl = (baseUrl) => {
  axios.defaults.baseURL = baseUrl;
}
export const httpInterceptor = (store) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.request.status === 401) {
        console.log(error)
      } else {
        return error;
      }
    }
  );

}

