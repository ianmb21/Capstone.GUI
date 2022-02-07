import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/auth';
import Login from "./components/auth/login"
import Register from "./components/auth/register";
import Request from "./components/holder/request";
import HolderHomepage from "./components/holder/";
import HolderRequestsList from "./components/holder/requestsList";
import IssuerRequestsList from "./components/issuer/requestsList";
import VerifierRequestsList from "./components/verifier/requestsList";
import IdentityDetail from "./components/record/identityDetail";
import CriminalRecord from "./components/record/criminalRecord";
import EducationRecord from "./components/record/educationRecord";
import EmploymentHistory from "./components/record/employmentHistory";
import CreditScore from "./components/record/creditScore";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBFooter
} from 'mdb-react-ui-kit';

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const selectedRecords = useSelector((state) => state.record.selectedRecords);

  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Router>
      <MDBNavbar expand='lg' dark bgColor='dark' className='mb-3'>
        <MDBContainer fluid>
          <MDBNavbarBrand>APPDS</MDBNavbarBrand>

            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
              {user && (
                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a' className='nav-link'>
                      {user.username}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <MDBDropdownLink onClick={handleLogout}>Logout</MDBDropdownLink>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>

      {/* <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>APPDS</Navbar.Brand>

          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={NavLink} to="/holder/list">Holder</Nav.Link>
                <Nav.Link as={NavLink} to="/issuer/list">Issuer</Nav.Link>
                <Nav.Link as={NavLink} to="/verifier/list">Verifier</Nav.Link>
              </>
            )}
          </Nav>

          {(user && (!Array.isArray(selectedRecords) || !selectedRecords.length)) && (
            <Nav>
              <NavDropdown title={user.username} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Container>
      </Navbar> */}
      <MDBContainer fluid>
        <Routes>
          <Route path="/" element={<Login roleName="Holder" />} />
          {/* <Route path="/holder/login" element={<Login roleName="Holder" />} /> */}
          <Route path="/holder/" element={<HolderHomepage />} />
          <Route path="/holder/list" element={<HolderRequestsList />} />
          <Route path="/holder/register" element={<Register roleName="Holder" />} />
          <Route path="/holder/request" element={<Request />} />

          {/* <Route path="/issuer/login" element={<Login roleName="Issuer" />} />
          <Route path="/issuer/register" element={<Register roleName="Issuer" />} /> */}
          <Route path="/issuer/list" element={<IssuerRequestsList />} />

          {/* <Route path="/verifier/login" element={<Login roleName="Verifier" />} />
          <Route path="/verifier/register" element={<Register roleName="Verifier" />} /> */}
          <Route path="/verifier/list" element={<VerifierRequestsList />} />

          <Route path="/record/Identity%20Detail/:nationalId" element={<IdentityDetail />} />
          <Route path="/record/Criminal%20Record/:nationalId" element={<CriminalRecord />} />
          <Route path="/record/Education%20Record/:nationalId" element={<EducationRecord />} />
          <Route path="/record/Employment%20History/:nationalId" element={<EmploymentHistory />} />
          <Route path="/record/Credit%20Score/:nationalId" element={<CreditScore />} />
        </Routes>
      </MDBContainer>

      
    </Router>
  );

}