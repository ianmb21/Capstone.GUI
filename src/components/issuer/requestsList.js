import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { Breadcrumb, Row, Col, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFileAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { getRequests, updateRequest } from "../../actions/issuer";
import { setMessage, clearMessage } from '../../actions/message';

export default function RequestsLists() {
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.issuer.allRequests);
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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const requestStatusList = [
    { id: 'All', value: 'All' },
    { id: 'PendingHolder', value: 'PendingHolder' },
    { id: 'RejectedIssuer', value: 'RejectedIssuer' },
    { id: 'RejectedVerifier', value: 'RejectedVerifier' },
    { id: 'Approved', value: 'Approved' },
    { id: 'Revoked', value: 'Revoked' },
    { id: 'PendingIssuer', value: 'PendingIssuer' },
    { id: 'PendingVerifier', value: 'PendingVerifier' }
  ];

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => onClick(row);

    return <Button onClick={clickHandler}><FontAwesomeIcon icon={faInfoCircle} /></Button>;
  };

  const columns = [
    {
      name: 'Request ID',
      selector: row => row.requestId,
    },
    {
      name: 'Requested by',
      selector: row => row.verifiedBy,
    },
    {
      name: 'Record Type',
      selector: row => row.recordTypeName,
    },
    {
      name: 'National Id',
      selector: row => row.nationalId ? '*****' + row.nationalId.substr(row.nationalId.length - 4) : ""
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
      name: 'Purpose',
      selector: row => row.purpose,
    },
    {
      name: 'Date Requested',
      selector: row => row.dateRequested,
    },
    {
      name: 'Remarks',
      selector: row => row.remarks,
    },
    {
      button: true,
      cell: (row) => <ActionComponent onClick={handleShow} row={row} />,
    },
  ];

  const [remarks, setRemarks] = useState("");

  const onChangeRemarks = (e) => {
    const remarks = e.target.value;
    setRemarks(remarks);
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
      remarks: remarks,
      recordTypeId: [currentRow.recordTypeId]
    }

    dispatch(updateRequest(data))
      .then(() => {
        setRemarks("");

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
    if (!user) return navigate("/");

    dispatch(getRequests());

    return () => dispatch(clearMessage());

  }, [user, navigate, dispatch]);

  return (
    <>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item active>Issuer</Breadcrumb.Item>
        <Breadcrumb.Item active>Requests List</Breadcrumb.Item>
      </Breadcrumb>


      {message && (
        <Alert className="mb-3" variant="success">
          {message}
        </Alert>
      )}

      <Form.Select aria-label="Default select example" onChange={(e) => handleSelect(e)}>
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
            pagination
            columns={columns}
            data={requests}
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
            Request Details
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
                    <Form.Control size="sm" readOnly defaultValue={currentRow.nationalId ? '*****' + currentRow.nationalId.substr(currentRow.nationalId.length - 4) : ""} />
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
                  <Form.Group as={Col} md="12" controlId="remarks">
                    <Form.Label>
                      Remarks
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      value={remarks}
                      onChange={onChangeRemarks}
                    />
                  </Form.Group>
                </Row>
              </Form>
            </>
          ) : ''}

        </Modal.Body>
        <Modal.Footer>
          <Link to={`/record/${currentRow.recordTypeName}/${currentRow.nationalId}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon={faFileAlt} /> Show Record Details
            </Button>
          </Link>

          {(currentRow.requestStatus === "PendingIssuer") &&
            (
              <><Button variant="success" disabled={loading} onClick={() => updateStatusAndRemarks("PendingHolder")}>
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