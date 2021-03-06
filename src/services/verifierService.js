import axios from "axios";
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_URL}/Verifier/`;

const getRequests = (requestStatus='All') => {
  return axios.get(API_URL + "getRequest/" + requestStatus, { headers: authHeader() });
};

const updateRequest = (data) => {
  return axios.put(API_URL + "updateRequest", data, { headers: authHeader() });
};

const searchHolder = (firstName, lastName) => {
  return axios.post(API_URL + "searchHolder", {firstName, lastName}, { headers: authHeader() });
};

const createRequest = (userId, nationalId, firstName, lastName, birthdate, requestStatus, recordTypeId, Remarks, holderId, verifiedBy) => {
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
    verifiedBy,
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