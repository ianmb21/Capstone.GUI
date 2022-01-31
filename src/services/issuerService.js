import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://20.24.121.187/api/Issuer/";

const getRequests = () => {
  return axios.get(API_URL + "getRequest", { headers: authHeader() });
};

const updateRequest = (data) => {
  console.log(data);
  return axios.put(API_URL + "updateRequest", data, { headers: authHeader() });
};

const IssuerService = {
  getRequests,
  updateRequest,
};

export default IssuerService;