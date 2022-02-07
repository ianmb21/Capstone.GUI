import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import CardRecords from '../utilities/cardRecords';
import CardReports from '../utilities/cardReports';

export default function Index() {
  return (
    <>
      <MDBCard border='dark' className='mb-3'>
        <MDBCardHeader>Quick Links</MDBCardHeader>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='4'>
              <CardReports title='Pending Requests' />
            </MDBCol>
            <MDBCol md='4'>
              <CardReports title='All Requests' />
            </MDBCol>
            <MDBCol md='4'>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <MDBCard border='dark'>
        <MDBCardHeader>Records</MDBCardHeader>
        <MDBCardBody>
          <MDBRow className='mb-3'>
            <MDBCol md='4'>
              <CardRecords title='Identity Details' hasRecord={true} />
            </MDBCol>
            <MDBCol md='4'>
              <CardRecords title='Credit Score' />
            </MDBCol>
            <MDBCol md='4'>
              <CardRecords title='Education Record' hasRecord={true} />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md='4'>
              <CardRecords title='Employment History' />
            </MDBCol>
            <MDBCol md='4'>
              <CardRecords title='Criminal Record' hasRecord={true} />
            </MDBCol>
            <MDBCol md='4'>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </>
  )
}