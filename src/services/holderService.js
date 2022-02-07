import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://52.154.202.96/api/Holder/";

const getRequests = (userId, requestStatus) => {
  return axios.get(API_URL + "getRequest/" + userId + '/' + requestStatus, { headers: authHeader() });
};

const createRequest = (userId, nationalId, firstName, lastName, birthdate, requestStatus, recordTypeId) => {
  return axios.post(API_URL + "createRequest", {
    userId,
    nationalId,
    firstName,
    lastName,
    birthdate,
    requestStatus,
    recordTypeId,
  }, { headers: authHeader() });
};

const updateRequestStatus = (data) => {
  console.log(data);
  return axios.put(API_URL + "updateRequestStatus", data, { headers: authHeader() });
};

const IssuerService = {
  getRequests,
  createRequest,
  updateRequestStatus
};

export default IssuerService;