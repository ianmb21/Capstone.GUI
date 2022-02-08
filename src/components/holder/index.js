import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import CardRecords from '../utilities/cardRecords';
import CardReports from '../utilities/cardReports';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getRequests } from '../../actions/holder';

export default function Index() {
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.holder.allRequests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doesRecordExist = (requests, recordTypeName) => {
    const filteredRequest = requests.filter(
      request =>
        request.recordTypeName == recordTypeName &&
        (request.requestStatus === 'PendingVerifier' || request.requestStatus === 'Approved')
    );

    console.log(filteredRequest)

    return filteredRequest.length > 0 ? true : false;
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(getRequests(user.userId));
    }

  }, [user, navigate]);

  return (
    <>
      <MDBRow>
        <MDBCol md='8'>
          <MDBCard border='dark'>
            <MDBCardHeader>Records</MDBCardHeader>
            <MDBCardBody>
              <MDBRow className='mb-3'>
                <MDBCol md='6'>
                  <CardRecords title='Identity Details' hasRecord={doesRecordExist(requests, 'Identity Detail')} />
                </MDBCol>
                <MDBCol md='6'>
                  <CardRecords title='Credit Score' hasRecord={doesRecordExist(requests, 'Credit Score')}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className='mb-3'>
                <MDBCol md='6'>
                  <CardRecords title='Education Record' hasRecord={doesRecordExist(requests, 'Education Record')} />
                </MDBCol>
                <MDBCol md='6'>
                  <CardRecords title='Employment History' hasRecord={doesRecordExist(requests, 'Employment History')}/>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md='6'>
                  <CardRecords title='Criminal Record' hasRecord={doesRecordExist(requests, 'Criminal Record')} />
                </MDBCol>
                <MDBCol md='6'>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard border='dark' className='mb-3'>
            <MDBCardHeader>Quick Links</MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol>
                  <CardReports title='Request List' text='See all record requests' link='/holder/list' />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  )
}