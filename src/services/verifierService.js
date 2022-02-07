import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://52.154.202.96/api/Verifier/";

const getRequests = () => {
  return axios.get(API_URL + "getRequest/All", { headers: authHeader() });
};

const updateRequest = (data) => {
  return axios.put(API_URL + "updateRequest", data, { headers: authHeader() });
};

const searchHolder = (firstName, lastName) => {
  return axios.post(API_URL + "searchHolder", {firstName, lastName}, { headers: authHeader() });
};

const createRequest = (userId, nationalId, firstName, lastName, birthdate, requestStatus, recordTypeId, Remarks, holderId) => {
  return axios.post(API_URL + "createRequest", {
    userId,
    nationalId,
    firstName,
    lastName,
    birthdate,
    requestStatus,
    recordTypeId,
    Remarks,
    holderId,
  }, { headers: authHeader() });
};

const getRecordType = (subRoleId) => {
  return axios.get(API_URL + "getRecordType/" + subRoleId, { headers: authHeader() });
};

const VerifierService = {
  getRequests,
  updateRequest,
  searchHolder,
  createRequest,
  getRecordType,
};

export default VerifierService;