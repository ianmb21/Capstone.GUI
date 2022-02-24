import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/auth';
import Login from "./components/auth/login"
import Register from "./components/auth/register";
import HolderHomepage from "./components/holder/";
import HolderRequestsList from "./components/holder/requestsList";
import IssuerRequestsList from "./components/issuer/requestsList";
import VerifierHomepage from "./components/verifier";
import VerifierRequestsList from "./components/verifier/requestsList";
import VerifierRequest from "./components/verifier/verifierRequest";
import IdentityDetail from "./components/record/identityDetail";
import CriminalRecord from "./components/record/criminalRecord";
import EducationRecord from "./components/record/educationRecord";
import EmploymentHistory from "./components/record/employmentHistory";
import CreditScore from "./components/record/creditScore";
import Sample from "./components/utilities/sample";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
} from 'mdb-react-ui-kit';

export default function App() {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <Router>
      <MDBNavbar expand='lg' dark bgColor='dark' className='mb-3'>
        <MDBContainer fluid>
          <MDBNavbarBrand>{user && user.roleName ? user.roleName : "APPDS"}</MDBNavbarBrand>

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

      <MDBContainer fluid>
        <Routes>
          <Route path="/" element={<Login roleName="Holder" />} />
          <Route path="/holder/" element={<HolderHomepage />} />
          <Route path="/holder/list" element={<HolderRequestsList />} />
          <Route path="/holder/register" element={<Register roleName="Holder" />} />

          <Route path="/issuer" element={<IssuerRequestsList />} />
          <Route path="/issuer/list" element={<IssuerRequestsList />} />

          <Route path="/verifier/" element={<VerifierHomepage />} />
          <Route path="/verifier/list" element={<VerifierRequestsList />} />
          <Route path="/verifier/request" element={<VerifierRequest />} />

          <Route path="/record/Identity%20Detail/:nationalIdParams" element={<IdentityDetail />} />
          <Route path="/record/Criminal%20Record/:nationalIdParams" element={<CriminalRecord />} />
          <Route path="/record/Education%20Record/:nationalIdParams" element={<EducationRecord />} />
          <Route path="/record/Employment%20History/:nationalIdParams" element={<EmploymentHistory />} />
          <Route path="/record/Credit%20Score/:nationalIdParams" element={<CreditScore />} />

          <Route path="/test" element={<Sample />} />
        </Routes>
      </MDBContainer>
    </Router>
  );

}