import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://52.154.202.96/api/Issuer";

const getRecordDetail = (nationalId, recordTypeName) => {
  let recordTypeAPI = "";

  switch (recordTypeName) {
    case "Identity Detail":
      recordTypeAPI = "getIdentityDetail";
      break;

    case "Credit Score":
      recordTypeAPI = "getCreditScore";
      break;

    case "Education Record":
      recordTypeAPI = "getEducationRecord";
      break;

    case "Employment History":
      recordTypeAPI = "getEmploymentHistory";
      break;

    case "Criminal Record":
      recordTypeAPI = "getCriminalRecord";
      break;

    default:
      return console.log("Incorrect API call.");
  }

  return axios.get(`${API_URL}/${recordTypeAPI}/${nationalId}`, { headers: authHeader() });
};

const RecordService = {
  getRecordDetail,
};

export default RecordService;