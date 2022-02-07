import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { Breadcrumb, Row, Col, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlusCircle, faFileAlt, faPaperPlane, faUndo } from '@fortawesome/free-solid-svg-icons';

import { getRequests, updateRequestStatus } from "../../actions/holder";

export default function RequestsLists() {
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.holder.allRequests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentRow, setCurrentRow] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    setCurrentRow(row);
    row.requestStatus === "For Verification" ?
      setReadOnly(false) : setReadOnly(true);
  };

  const handleSelect = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(getRequests(user.userId, e.target.value))
    .then(() => {
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };
  
  const requestStatusList = [{id: 'All', value: 'All'}, 
  {id: 'New Request', value: 'New Request'}, 
  {id: 'Rejected', value: 'Rejected'}, 
  {id: 'Approved', value: 'Approved'}, 
  {id: 'Revoked', value: 'Revoked'}, 
  {id: 'Request Confirmation', value: 'Request Confirmation'}, 
  {id: 'For Verification', value: 'For Verification'}];

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => onClick(row);

    return <Button onClick={clickHandler}><FontAwesomeIcon icon={faInfoCircle} /></Button>;
  };

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

  useEffect(() => {

    if (!user) {
      // navigate("/holder/login");
      navigate("/");
    } else {
      dispatch(getRequests(user.userId, 'All'));
    }

  }, [user, navigate, dispatch]);
  
  const updateHolderRequestStatus = (status) => {
    setLoading(true);

    const data = {
      requestId: currentRow.requestId,
      requestStatus: status
    }

    console.log(data);

    dispatch(updateRequestStatus(data))
      .then(() => {
        handleClose();

        // dispatch(setMessage("The request has been updated."));
        dispatch(getRequests(user.userId));

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item active>Holder</Breadcrumb.Item>
        <Breadcrumb.Item active>Requests List</Breadcrumb.Item>
      </Breadcrumb>

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
                {currentRow.dateIssued && (
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
                )}

                {currentRow.dateApproved && (
                  <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="verifiedBy">
                      <Form.Label>
                        Verified By
                      </Form.Label>
                      <Form.Control size="sm" readOnly defaultValue={currentRow.verifiedBy} />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="dateApproved">
                      <Form.Label>
                        Date Verified
                      </Form.Label>
                      <Form.Control size="sm" readOnly defaultValue={currentRow.dateApproved} />
                    </Form.Group>
                  </Row>
                )}
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="remarks">
                    <Form.Label>
                      Remarks
                    </Form.Label>
                    <Form.Control as="textarea" readOnly={readOnly} defaultValue={currentRow.remarks} />
                  </Form.Group>
                </Row>
              </Form>
            </>
          ) : ''}
        </Modal.Body>

        <Modal.Footer>
          {(currentRow.requestStatus === "For Verification" || currentRow.requestStatus === "Approved") &&
            (
              <Link to={`/record/${currentRow.recordTypeName}/${currentRow.nationalId}`} target="_blank">
                <Button variant="primary">
                  <FontAwesomeIcon icon={faFileAlt} /> Show Record Details
                </Button>
              </Link>
            )
          }
          {         
            (currentRow.hasRecord && currentRow.requestStatus === "Request Confirmation") ?
            (
              <Button variant="primary" disabled={loading} onClick={() => updateHolderRequestStatus("For Verification")}>
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
                  <><FontAwesomeIcon icon={faPaperPlane} /> Send To Verifier</>
                )}
              </Button>
            ) 
            : (!currentRow.hasRecord && currentRow.requestStatus === "Request Confirmation") ?
            (
              <Button variant="primary" disabled={loading} onClick={() => updateHolderRequestStatus("New Request")}>
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
                  <><FontAwesomeIcon icon={faPaperPlane} /> Send To Issuer</>
                )}
              </Button>
            )
            : (currentRow.requestStatus === "For Verification")?
            (
              <Button variant="danger" disabled={loading} onClick={() => updateHolderRequestStatus("Revoked")}>
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
                  <><FontAwesomeIcon icon={faUndo} /> Revoke</>
                )}
              </Button>
            )
            :
            (
              ""
            )
          }
        </Modal.Footer>
      </Modal>

    </>
  );
};