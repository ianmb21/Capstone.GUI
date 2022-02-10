import { Link } from 'react-router-dom';
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
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function CardRequest({ title, link, text }) {

  return (
    <>
      <Link to={link ? link : "/verifier/"}>
        <MDBCard background='primary' className='text-white hover-shadow mb-3'>
          <MDBRow className='g-0'>
            <MDBCol md='4' className='p-3 text-center'>
              <FontAwesomeIcon icon={faPlus} size='5x' />
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
