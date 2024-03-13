import axios from "axios";

import authHeaderWithType from "./auth-header"

// const API_URL = "/api/ppdb-abudzar/user";
const API_URL = "http://127.0.0.1:8000/api/ppdb-abudzar/user";

// const getAllPublicUsers = () => {
//   return axios.get(API_URL + "/public");
// };

const getAllPrivateUsers = () => {
  // return axios.get(API_URL + "/private", { headers: authHeaderWithType() });
  // return axios.get(API_URL);
  return axios.get(API_URL, { headers: authHeaderWithType() });
};

const userService = {
  // getAllPublicUsers,
  getAllPrivateUsers,
};

export default userService;
