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
import { faFingerprint, faMoneyCheckAlt, faGraduationCap, faBriefcase, faUserNinja, faBorderNone } from '@fortawesome/free-solid-svg-icons';

export default function CardRecords({ title, hasRecord }) {

  const getIcon = title => {

    switch (title) {
      case "Identity Details":
        return faFingerprint;
      case "Credit Score":
        return faMoneyCheckAlt;
      case "Education Record":
        return faGraduationCap;
      case "Employment History":
        return faBriefcase;
      case "Criminal Record":
        return faUserNinja;
      default:
        return faBorderNone;
    }

  }



  return (
    <>
      <MDBCard border={hasRecord ? 'primary' : 'dark'} style={{ maxWidth: '500px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='4' className='p-3 text-center'>
            <FontAwesomeIcon icon={getIcon(title)} size='8x' />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardBody>
              <MDBCardTitle>{title}</MDBCardTitle>
              <MDBCardText>
                summary_of_record
              </MDBCardText>
              {hasRecord ? (
                <MDBBtn color='primary'>See Record Details</MDBBtn>
              ) : (
                <MDBCardText>
                  <small className='text-muted'>No record found</small>
                </MDBCardText>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </>
  );
};
