import {
  GET_RECORD_DETAIL,
  REMOVE_SELECTED_RECORD,
} from "./types";

import RecordService from "../services/recordService";

export const getRecordDetail = (nationalId, recordTypeName) => async (dispatch) => {
  try {
    const response = await RecordService.getRecordDetail(nationalId, recordTypeName);

    dispatch({
      type: GET_RECORD_DETAIL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}

export const removeSelectedRecord = () => async (dispatch) => {
  dispatch({
    type: REMOVE_SELECTED_RECORD,
  });
}