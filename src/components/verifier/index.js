import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import CardReports from '../utilities/cardReports';
import CardRequest from '../utilities/cardRequest';
import CarouselInsurance from '../utilities/carouselInsurance';
import CarouselEmployer from '../utilities/carouselEmployer';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

export default function Index() {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

  }, [user, navigate]);

  return (
    <>
      <MDBRow>
        <MDBCol md='8'>
          {user && user.subRoleId == 6 ? <CarouselInsurance /> : ''}
          {user && user.subRoleId == 7 ? <CarouselEmployer /> : ''}
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard border='dark'>
            <MDBCardHeader>Quick Links</MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <CardRequest title='Request Record' text='Request record of an individual' link='/verifier/request' />
              </MDBRow>
              <MDBRow>
                <CardReports title='Requests Lists' text='See the list of all record requests' link='/verifier/list' />
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  )
}