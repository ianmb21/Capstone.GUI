import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function CardReports({ title }) {

  return (
    <>
      <MDBCard border='success' style={{ maxWidth: '500px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='4' className='p-3 text-center'>
            <FontAwesomeIcon icon={faList} size='5x' />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardBody>
              <MDBCardTitle>{title} (n)</MDBCardTitle>
              <MDBBtn color='primary'>See Report List</MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </>
  );
};
