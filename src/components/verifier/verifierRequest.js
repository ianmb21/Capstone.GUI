import { Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { searchHolder, createRequest, getRecordType } from '../../actions/verifier';
import { setMessage, clearMessage } from '../../actions/message';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow } from 'mdb-react-ui-kit';

export default function VerifierRequest() {
  const user = useSelector((state) => state.auth.user);
  const holderList = useSelector((state) => state.verifier.holderSearch);
  const subRoleMatrix = useSelector((state) => state.verifier.recordTypeId);
  const [loading, setLoading] = useState(false);
  const message = useSelector(state => state.message);

  const [currentRow, setCurrentRow] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialSearchState = {
    firstName: "",
    lastName: ""
  };

  const [search, setSearch] = useState(initialSearchState);

  const [show, setShow] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const handleClose = () => setShow(false);

  const handleCloseMessage = () => {
    setShowMessage(false);
    dispatch(clearMessage());
  }

  const handleShow = (row) => {
    setShow(true);
    setCurrentRow(row);
  };

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => onClick(row);

    return <Button onClick={clickHandler}>Select</Button>;
  };

  const columns = [
    {
      name: "National ID",
      selector: row => '*****' + row.nationalId.substr(row.nationalId.length - 4)
    },
    {
      name: "First Name",
      selector: row => row.firstName,
    },
    {
      name: "Middle Name",
      selector: row => row.middleName,
    },
    {
      name: "Last Name",
      selector: row => row.lastName,
    },
    {
      button: true,
      cell: (row) => <ActionComponent onClick={handleShow} row={row} />,
    },
  ]

  const initialRequestState = {
    nationalId: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    remarks: "",
    holderId: "",
    recordTypeIds: []
  };

  const [request, setRequest] = useState(initialRequestState);

  const handleCheckboxChange = (e) => {
    const checkboxValue = parseInt(e.target.value);

    let selectedRecordTypeId = [...request.recordTypeIds, checkboxValue];

    if (request.recordTypeIds.includes(checkboxValue)) {
      selectedRecordTypeId = selectedRecordTypeId.filter((recordTypeIds) => recordTypeIds !== checkboxValue);
    }

    setRequest({ ...request, recordTypeIds: selectedRecordTypeId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  }

  const handlePurposeChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  }

  const handleRequest = (e) => {
    e.preventDefault();

    setLoading(true);

    const { nationalId, firstName, lastName, birthdate, recordTypeIds, remarks, holderId } = request;

    if (!Array.isArray(recordTypeIds) || !recordTypeIds.length) {
      dispatch(setMessage("Error: Please select a Record Type."));

      setLoading(false);
    } else if (remarks === "") {
      dispatch(setMessage("Error: Please input purpose details."));
      setLoading(false);
    } else {
      dispatch(createRequest(user.userId, nationalId, firstName, lastName, birthdate, recordTypeIds, remarks, holderId, user.username))

        .then(() => {

          setLoading(false);

          dispatch(setMessage("Request/s has been successfully created."));

          setShow(false);

          setShowMessage(true);

          setSearch(initialSearchState);

          dispatch(searchHolder(search.firstName, search.lastName))
        })
        .catch((error) => {
          console.log(error);

          setLoading(false);
        });
    }

  };

  const handleSearch = (e) => {

    e.preventDefault();

    setLoading(true);

    dispatch(searchHolder(search.firstName, search.lastName))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })

  }

  useEffect(() => {

    if (!user) {
      //navigate("/verifier/login");
      navigate("/");
    } else {
      dispatch(searchHolder(search.firstName, search.lastName))
      dispatch(getRecordType(user.subRoleId));
    }
    return () => {
      dispatch(clearMessage());
    }

  }, [user, navigate, dispatch]);

  useEffect(() => {
    setRequest({
      ...request
      , nationalId: currentRow.nationalId
      , firstName: currentRow.firstName
      , lastName: currentRow.lastName
      , birthdate: currentRow.birthDate
      , holderId: currentRow.holderId
      , remarks: ""
    });
  }, [show, currentRow.nationalId, currentRow.firstName, currentRow.lastName, currentRow.birthDate, currentRow.holderId])

  return (
    <>
      <Link to="/verifier/list">
        <Button variant="link" className="mb-3"><FontAwesomeIcon icon={faArrowLeft} /> Return to request list</Button>
      </Link>
      <MDBRow>
        <MDBCol md='4'>
          <MDBCard border='primary'>
            <MDBCardHeader>
              Search Holder
            </MDBCardHeader>
            <MDBCardBody>
              <Form className="mb-3" onSubmit={handleSearch}>
                <Form.Group className="mb-3" controlId="firstName">

                  <Form.Control
                    required
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={search.firstName}
                    onChange={handleInputChange}
                  />

                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">

                  <Form.Control
                    required
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={search.lastName}
                    onChange={handleInputChange}
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
                      {" "}Searching...
                    </>
                  ) : (
                    <><FontAwesomeIcon icon={faSearch} /> Search</>
                  )}
                </Button>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='8'>
          {holderList.length > 0 && (
            <MDBCard border='primary'>
              <MDBCardHeader>
                Holder List
              </MDBCardHeader>
              <MDBCardBody>
                <DataTable
                  columns={columns}
                  data={holderList}
                />
              </MDBCardBody>
            </MDBCard>
          )}
        </MDBCol>
      </MDBRow>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Request record of '{currentRow.firstName} {currentRow.middleName} {currentRow.lastName}'
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="recordType">
            <Form.Label>Record Type*</Form.Label>
            {subRoleMatrix.map((data) => {

              let labelName = "";
              switch (data.recordTypeId) {
                case 1:
                  labelName = "Identity Detail";
                  break;
                case 2:
                  labelName = "Credit Score";
                  break;
                case 3:
                  labelName = "Education Record";
                  break;
                case 4:
                  labelName = "Employment History";
                  break;
                case 5:
                  labelName = "Criminal Record";
                  break;
                default:
                  labelName = "";
              }
              return (
                <Form.Check
                  type="checkbox"
                  id={data.recordTypeId}
                  label={labelName}
                  value={data.recordTypeId}
                  onChange={handleCheckboxChange}
                  key={data.recordTypeId}
                />
              )
            })}
          </Form.Group>
          <Form.Group md="12" controlId="remarks">
            <Form.Label>
              Purpose
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="remarks"
              onChange={handlePurposeChange}
            />
            {message && (
              <Alert className="mt-3" variant="danger">
                {message}
              </Alert>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRequest}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {" "}Sending...
              </>
            ) : (
              <>Send Request</>
            )}
          </Button>

          {" "}
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showMessage}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body>
          {message && (
            <Alert className="mt-3" variant="success">
              {message}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <Button size="lg" variant="outline-success" onClick={handleCloseMessage}>OK</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}