import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/auth';
import Login from "./components/auth/login"
import Register from "./components/auth/register";
import Request from "./components/holder/request";
import HolderRequestsList from "./components/holder/requestsList";
import IssuerRequestsList from "./components/issuer/requestsList";
import VerifierRequestsList from "./components/verifier/requestsList";
import IdentityDetail from "./components/record/identityDetail";
import CriminalRecord from "./components/record/criminalRecord";
import EducationRecord from "./components/record/educationRecord";
import EmploymentHistory from "./components/record/employmentHistory";
import CreditScore from "./components/record/creditScore";

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const selectedRecords = useSelector((state) => state.record.selectedRecords);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>APPDS</Navbar.Brand>

          <Nav className="me-auto">
            {!user && (
              <>
                {/* <Nav.Link as={NavLink} to="/holder/list">Holder</Nav.Link>
                <Nav.Link as={NavLink} to="/issuer/list">Issuer</Nav.Link>
                <Nav.Link as={NavLink} to="/verifier/list">Verifier</Nav.Link> */}
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
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Login roleName="Holder" />} />
          {/* <Route path="/holder/login" element={<Login roleName="Holder" />} /> */}
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
      </Container>
    </Router>
  );

}