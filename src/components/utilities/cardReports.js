import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function CardReports({ title, link, text }) {

  return (
    <>
      <Link to={link ? link : "/verifier/"}>
        <MDBCard background='primary' className='text-white hover-shadow'>
          <MDBRow className='g-0'>
            <MDBCol md='4' className='p-3 text-center'>
              <FontAwesomeIcon icon={faList} size='5x' />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>{text}</MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </Link>
    </>
  );
};
