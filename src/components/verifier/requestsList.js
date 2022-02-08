import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { Row, Col, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFileAlt, faThumbsUp, faThumbsDown, faPlusCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../utilities/breadcrumb';
import { getRequests, updateRequest } from "../../actions/verifier";
import { setMessage, clearMessage } from '../../actions/message';

export default function RequestsLists() {
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.verifier.allRequests);
  const message = useSelector((state) => state.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentRow, setCurrentRow] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    setCurrentRow(row);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setLoading(true);
    
    dispatch(getRequests(e.target.value))
    .then(() => {
      setLoading(false);
      //dispatch(setMessage("Request/s has been successfully created."));
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };

  const requestStatusList = [{ id: 'All', value: 'All' },
  { id: 'PendingHolder', value: 'PendingHolder' },
  { id: 'RejectedIssuer', value: 'RejectedIssuer' },
  { id: 'RejectedVerifier', value: 'RejectedVerifier' },
  { id: 'Approved', value: 'Approved' },
  { id: 'Revoked', value: 'Revoked' },
  { id: 'PendingIssuer', value: 'PendingIssuer' },
  { id: 'PendingVerifier', value: 'PendingVerifier' }];

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => onClick(row);
    const disabled = row.requestStatus === "Revoked" ? true : false;

    return <Button disabled={disabled} onClick={clickHandler}><FontAwesomeIcon icon={faInfoCircle} /></Button>;
  };

  const conditionalRowStyles = [
    {
      when: row => row.requestStatus === "Revoked",
      style: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    }
  ];

  const columns = [
    {
      name: 'Record Type',
      selector: row => row.recordTypeName,
    },
    {
      name: 'National Id',
      selector: row => row.nationalId,
    },
    {
      name: 'First Name',
      selector: row => row.firstName,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
    },
    {
      name: 'Status',
      selector: row => row.requestStatus,
    },
    {
      name: 'Date Requested',
      selector: row => row.dateRequested,
    },
    {
      button: true,
      cell: (row) => <ActionComponent onClick={handleShow} row={row} />,
    },
  ];

  const onChangeRemarks = (e) => {
    const remarks = e.target.value;
    setCurrentRow({ ...currentRow, remarks: remarks });
  };

  const updateStatusAndRemarks = (status) => {
    setLoading(true);

    const data = {
      requestId: currentRow.requestId,
      userId: user.userId,
      nationalId: currentRow.nationalId,
      firstName: currentRow.firstName,
      lastName: currentRow.lastName,
      birthDate: new Date().toISOString().slice(0, 10),
      requestStatus: status,
      remarks: currentRow.remarks,
      recordTypeId: [currentRow.recordTypeId]
    }

    console.log(data);

    dispatch(updateRequest(data))
      .then(() => {
        handleClose();

        dispatch(setMessage("The request has been updated."));
        dispatch(getRequests());

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      // navigate("/verifier/login");
      navigate("/");
    } else {
      dispatch(getRequests());
    }

    return () => {
      dispatch(clearMessage());
    }

  }, [user, navigate, dispatch]);

  return (
    <>
      <Link to="/verifier">
        <Button variant="link"><FontAwesomeIcon icon={faArrowLeft} /> Return to homepage</Button>
      </Link>
      <Link to="/verifier/request">
        <Button variant="success" className='flex-right'><FontAwesomeIcon icon={faPlusCircle} /> Request Record</Button>
      </Link>

      {message && (
        <Alert className="mb-3" variant="danger">
          {message}
        </Alert>
      )}

      <Form.Select aria-label="Default select example" onChange={(e) => handleSelect(e) }>
          {
              requestStatusList.map((items) => {
                return (
                  <option value={items.id}>{items.value}</option>
                );
              })
          }          
      </Form.Select>  


      <Row>
        <Col>
          <DataTable
            title='Requests List'
            pagination
            columns={columns}
            data={requests}
            conditionalRowStyles={conditionalRowStyles}
            highlightOnHover
            striped
          />
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Header closeButton>
          <Modal.Title>
            {currentRow.recordTypeName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRow ? (
            <>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="nationalId">
                    <Form.Label>
                      National Id
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.nationalId} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="requestStatus">
                    <Form.Label>
                      Status
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.requestStatus} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="dateRequested">
                    <Form.Label>
                      Date Requested
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.dateRequested} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="firstName">
                    <Form.Label>
                      First Name
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.firstName} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="lastName">
                    <Form.Label>
                      Last Name
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.lastName} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="birthdate">
                    <Form.Label>
                      Birthdate
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.birthdate} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="8" controlId="issuedBy">
                    <Form.Label>
                      Issued By
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.issuedBy} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="dateIssued">
                    <Form.Label>
                      Date Issued
                    </Form.Label>
                    <Form.Control size="sm" readOnly defaultValue={currentRow.dateIssued} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="remarks">
                    <Form.Label>
                      Remarks
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      // defaultValue={currentRow.remarks ? currentRow.remarks : ""}
                      value={currentRow.remarks}
                      onChange={onChangeRemarks}
                    />
                  </Form.Group>
                </Row>
              </Form>
            </>
          ) : ''}

        </Modal.Body>
        <Modal.Footer>
          {/* <Link to={`/record/${currentRow.recordTypeName}/${currentRow.nationalId}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon={faFileAlt} /> Show Record Details
            </Button>
          </Link> */}
          {(currentRow.requestStatus === "PendingVerifier" || currentRow.requestStatus === "Approved") &&
            (
              <Link to={`/record/${currentRow.recordTypeName}/${currentRow.nationalId}`}>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faFileAlt} /> Show Record Details
                </Button>
              </Link>
            )
          }

          {(currentRow.requestStatus === "PendingVerifier") &&
            (
              <><Button variant="success" disabled={loading} onClick={() => updateStatusAndRemarks("Approved")}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true" />
                  {" "}Loading...
                </>
              ) : (
                <><FontAwesomeIcon icon={faThumbsUp} /> Approve</>
              )}
            </Button><Button variant="danger" disabled={loading} onClick={() => updateStatusAndRemarks("Rejected")}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true" />
                    {" "}Loading...
                  </>
                ) : (
                  <><FontAwesomeIcon icon={faThumbsDown} /> Reject</>
                )}
              </Button></>
            )
          }
        </Modal.Footer>
      </Modal>

    </>
  );
};