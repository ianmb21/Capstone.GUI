import axios from "axios";
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_URL}/Issuer/`;

const getRequests = (requestStatus = "All") => {
  return axios.get(API_URL + "getRequest/" + requestStatus , { headers: authHeader() });
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