import axios from "axios";
import authHeader from './auth-header';

const API_URL = "https://localhost/api/Verifier/";

const getRequests = () => {
  return axios.get(API_URL + "getRequest", { headers: authHeader() });
};

const updateRequest = (data) => {
  return axios.put(API_URL + "updateRequest", data, { headers: authHeader() });
};

const searchHolder = (firstName, lastName) => {
  return axios.post(API_URL + "searchHolder", {firstName, lastName}, { headers: authHeader() });
};

const createRequest = (userId, nationalId, firstName, lastName, birthdate, requestStatus, recordTypeId, Remarks) => {
  return axios.post(API_URL + "createRequest", {
    userId,
    nationalId,
    firstName,
    lastName,
    birthdate,
    requestStatus,
    recordTypeId,
    Remarks,
  }, { headers: authHeader() });
};

const getRecordType = (userId) => {
  return axios.get(API_URL + "getRecordType/" + userId, { headers: authHeader() });
};

const VerifierService = {
  getRequests,
  updateRequest,
  searchHolder,
  createRequest,
  getRecordType,
};

export default VerifierService;