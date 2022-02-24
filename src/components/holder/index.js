import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import CardRecords from '../utilities/cardRecords';
import CardReports from '../utilities/cardReports';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getNationalId, getRequests } from '../../actions/holder';

export default function Index() {
  const user = useSelector(state => state.auth.user);
  const nationalId = useSelector(state => state.holder.nationalId);
  const requests = useSelector(state => state.holder.allRequests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doesRecordExist = (requests, recordTypeName) => {
    const filteredRequest = requests.filter(
      request =>
        request.recordTypeName === recordTypeName &&
        (request.requestStatus === 'PendingVerifier' || request.requestStatus === 'Approved' || request.issuedBy !== null)
    );

    return filteredRequest.length > 0 ? true : false;
  }

  useEffect(() => {
    if (!user) return navigate("/");

    dispatch(getRequests(user.userId));
    dispatch(getNationalId(user.userId));

  }, [user, navigate, dispatch]);

  return (
    <>
      <MDBRow>
        <MDBCol lg='8'>
          <MDBCard border='dark' className='mb-3'>
            <MDBCardHeader>Records</MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol lg='6' className='mb-3'>
                  <CardRecords title='Identity Details' hasRecord={doesRecordExist(requests, 'Identity Detail')} nationalId={nationalId} />
                </MDBCol>
                <MDBCol lg='6' className='mb-3'>
                  <CardRecords title='Credit Score' hasRecord={doesRecordExist(requests, 'Credit Score')} nationalId={nationalId} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg='6' className='mb-3'>
                  <CardRecords title='Education Record' hasRecord={doesRecordExist(requests, 'Education Record')} nationalId={nationalId} />
                </MDBCol>
                <MDBCol lg='6' className='mb-3'>
                  <CardRecords title='Employment History' hasRecord={doesRecordExist(requests, 'Employment History')} nationalId={nationalId} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg='6'>
                  <CardRecords title='Criminal Record' hasRecord={doesRecordExist(requests, 'Criminal Record')} nationalId={nationalId} />
                </MDBCol>
                <MDBCol lg='6'>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg='4'>
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