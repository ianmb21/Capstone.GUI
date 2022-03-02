import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { Row, Col, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faArrowLeft, faFileAlt, faPaperPlane, faUndo } from '@fortawesome/free-solid-svg-icons';

import { getRequests, updateRequestStatus } from "../../actions/holder";

export default function RequestsLists() {
  const user = useSelector(state => state.auth.user);
  const requests = useSelector(state => state.holder.allRequests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialSearchFilterState = {
    status: 'All',
    requestedBy: '',
    recordType: '',
  }

  const [currentRow, setCurrentRow] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [searchFilters, setSearchFilters] = useState(initialSearchFilterState);
  // const [filteredRequests, setFilteredRequests] = useState({});

  const getRequestedByItems = () => {
    const allRequestedByItems = requests.map(item => item.verifiedBy);
    const uniqueRequestedByItems = [...new Set(allRequestedByItems)];

    return uniqueRequestedByItems;
  };

  const getRecordTypeItems = () => {
    const allRecordTypeItems = requests.map(item => item.recordTypeName);
    const uniqueRecordTypeItems = [...new Set(allRecordTypeItems)];

    return uniqueRecordTypeItems;
  };

  const handleClose = () => setShow(false);

  const handleShow = (row) => {
    setShow(true);
    setCurrentRow(row);
    row.requestStatus === "PendingVerifier" ?
      setReadOnly(false) : setReadOnly(true);
  };

  const handleSelect = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setSearchFilters({ ...searchFilters, [name]: value });
  };

  useEffect(() => {
    if (user) {
      dispatch(getRequests(user.userId, searchFilters.status))
      .then(() => {
        // TO-BE: Will convert this function in API
        // const filteredRequestsArray = requests.filter(request => {
        //   if (searchFilters.requestedBy === '') {
        //     return request.recordTypeName === searchFilters.recordType;
        //   }

        //   if (searchFilters.recordType === '') {
        //     return request.verifiedBy === searchFilters.requestedBy;
        //   }

        //   return request.recordTypeName === searchFilters.recordType || request.verifiedBy === searchFilters.requestedBy;
        // });

        // setFilteredRequests(filteredRequestsArray);

        // console.log(filteredRequestsArray);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [searchFilters, dispatch, user])

  const updateHolderRequestStatus = (status) => {
    setLoading(true);

    const data = {
      requestId: currentRow.requestId,
      requestStatus: status
    }

    dispatch(updateRequestStatus(data))
      .then(() => {
        handleClose();

        dispatch(getRequests(user.userId));

        setLoading(false);
      })
      .catch(error => {
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
      sortable: true,
    },
    {
      name: 'National Id',
      selector: row => row.nationalId,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.requestStatus,
      sortable: true,
    },
    {
      name: 'Purpose',
      selector: row => row.purpose,
    },
    {
      name: 'Date Requested',
      selector: row => row.dateRequested,
      sortable: true,
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

  useEffect(() => {
    if (!user) return navigate("/");

    dispatch(getRequests(user.userId, 'All'));

  }, [user, navigate, dispatch]);

  return (
    <>
      <Link to="/holder">
        <Button variant="link"><FontAwesomeIcon icon={faArrowLeft} /> Return to homepage</Button>
      </Link>

      <Row>
        <Form.Group as={Col} md="4" controlId="status">
          <Form.Label>
            Status
          </Form.Label>
          <Form.Select size='sm' name='status' onChange={(e) => handleSelect(e)} >
            {requestStatusList.map((items) =>
              <option value={items.id}>{items.value}</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="status">
          <Form.Label>
            Requested By
          </Form.Label>
          <Form.Select size='sm' name='requestedBy' onChange={(e) => handleSelect(e)} >
            <option value="">All</option>
            {getRequestedByItems().map((item) =>
              <option value={item}>{item}</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="status">
          <Form.Label>
            Record Type
          </Form.Label>
          <Form.Select size='sm' name='recordType' onChange={(e) => handleSelect(e)} >
            <option value="">All</option>
            {getRecordTypeItems().map((item) =>
              <option value={item}>{item}</option>
            )}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row>
        <Col>
          <DataTable
            title='Requests List'
            pagination
            columns={columns}
            data={requests}
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
          {(currentRow.requestStatus === "PendingVerifier" || currentRow.requestStatus === "Approved" ||
            (currentRow.requestStatus === "PendingHolder" && currentRow.issuedBy !== null)) &&
            (
              <Link to={`/record/${currentRow.recordTypeName}/${currentRow.nationalId}`}>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faFileAlt} /> Show Record Details
                </Button>
              </Link>
            )
          }
          {
            (currentRow.hasRecord && currentRow.requestStatus === "PendingHolder") ?
              (
                <Button variant="primary" disabled={loading} onClick={() => updateHolderRequestStatus("PendingVerifier")}>
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
              ) : (!currentRow.hasRecord && currentRow.requestStatus === "PendingHolder") ?
                (
                  <Button variant="primary" disabled={loading} onClick={() => updateHolderRequestStatus("PendingIssuer")}>
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
                ) : (currentRow.requestStatus === "PendingVerifier") ?
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
                  ) : ("")
          }
        </Modal.Footer>
      </Modal>

    </>
  );
};