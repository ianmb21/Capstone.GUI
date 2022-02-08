import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faMoneyCheckAlt, faGraduationCap, faBriefcase, faUserNinja, faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import IdentityDetail from '../record/identityDetail';
import CreditScore from '../record/creditScore';
import EducationRecord from '../record/educationRecord';
import EmploymentHistory from '../record/employmentHistory';
import CriminalRecord from '../record/criminalRecord';

export default function CardRecords({ title, hasRecord, nationalId = "P1234567A" }) {
  const [showModal, setShowModal] = useState(false);
  const [record, setRecord] = useState(null);

  const toggleShow = () => {
    setShowModal(!showModal);

    setRecord(showRecord(title));
  }

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

  const showRecord = title => {

    switch (title) {
      case "Identity Details":
        return <IdentityDetail nationalId={nationalId} />;
      case "Credit Score":
        return <CreditScore nationalId={nationalId} />;
      case "Education Record":
        return <EducationRecord nationalId={nationalId} />;
      case "Employment History":
        return <EmploymentHistory nationalId={nationalId} />;
      case "Criminal Record":
        return <CriminalRecord nationalId={nationalId} />;
      default:
        return '';
    }
    
  }

  return (
    <>
      <MDBCard border={hasRecord ? 'primary' : 'dark'} className='hover-shadow' style={{ maxWidth: '500px' }}>
        <MDBRow className='g-0'>
          <MDBCol md='4' className='p-3 text-center'>
            <FontAwesomeIcon icon={getIcon(title)} size='8x' />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardBody>
              <MDBCardTitle>{title}</MDBCardTitle>
              {hasRecord ? (
                <MDBBtn color='primary' onClick={toggleShow}>See Record Details</MDBBtn>
              ) : (
                <MDBCardText>
                  <small className='text-muted'>No record found</small>
                </MDBCardText>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>

      <MDBModal show={showModal} setShow={setShowModal} tabIndex='-1'>
        <MDBModalDialog size='xl' centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {record}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};