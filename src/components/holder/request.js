import { useEffect, useState } from 'react';

import { Form, Button, Row, Col, Breadcrumb, Spinner, Alert } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setMessage, clearMessage } from '../../actions/message';
import { createRequest } from '../../actions/holder';

export default function Request() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const message = useSelector(state => state.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialRequestState = {
    nationalId: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    recordTypeIds: []
  };

  const [request, setRequest] = useState(initialRequestState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = parseInt(e.target.value);

    let selectedRecordTypeId = [...request.recordTypeIds, checkboxValue];

    if (request.recordTypeIds.includes(checkboxValue)) {
      selectedRecordTypeId = selectedRecordTypeId.filter((recordTypeIds) => recordTypeIds !== checkboxValue);
    }

    setRequest({ ...request, recordTypeIds: selectedRecordTypeId });
  };

  const handleRequest = (e) => {
    e.preventDefault();

    setLoading(true);

    const { nationalId, firstName, lastName, birthdate, recordTypeIds } = request;

    if (!Array.isArray(recordTypeIds) || !recordTypeIds.length) {
      dispatch(setMessage("Please select a Record Type."));

      setLoading(false);
    } else {
      dispatch(createRequest(user.userId, nationalId, firstName, lastName, birthdate, recordTypeIds))
        .then(() => {
          setLoading(false);

          dispatch(setMessage("Request/s has been successfully created."));
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

  };

  useEffect(() => {
    if (!isLoggedIn) {
      // navigate("/holder/login");
      navigate("/");
    }

    return () => {
      dispatch(clearMessage());
    }
  }, [isLoggedIn, navigate, dispatch]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/holder/list" }}>Holder</Breadcrumb.Item>
        <Breadcrumb.Item active>Request Record</Breadcrumb.Item>
      </Breadcrumb>
      <Row className='mt-3'>
        <Col md={6}>
          <Form onSubmit={handleRequest}>
            <Form.Group className="mb-3" controlId="nationalId">
              <Form.Label>National Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="National Id"
                name="nationalId"
                value={request.nationalId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                name="firstName"
                value={request.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={request.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="birthdate">
              <Form.Label>Birthdate*</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Birthdate"
                name="birthdate"
                value={request.birthdate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recordType">
              <Form.Label>Record Type*</Form.Label>
              <Form.Check
                type="checkbox"
                id="identityDetail"
                label="Identity Detail"
                value="1"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="creditScore"
                label="Credit Score"
                value="2"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="educationRecords"
                label="Education Record"
                value="3"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="employmentHistory"
                label="Employment History"
                value="4"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="criminalRecord"
                label="Criminal Record"
                value="5"
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {" "}Loading...
                </>
              ) : (
                <>Submit</>
              )}
            </Button>

            {" "}
            <Link to="/holder/list">
              <Button variant="secondary">Back</Button>
            </Link>

            {message && (
              <Alert className="mt-3" variant="danger">
                {message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}