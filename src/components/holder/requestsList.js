import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import { Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import Breadcrumb from '../utilities/breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlusCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import { getRequests } from "../../actions/holder";
import { MDBBtn } from 'mdb-react-ui-kit';

export default function RequestsLists() {
  const user = useSelector((state) => state.auth.user);
  const requests = useSelector((state) => state.holder.allRequests);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentRow, setCurrentRow] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    setCurrentRow(row);
  };

  const ActionComponent = ({ row, onClick }) => {
    const clickHandler = () => onClick(row);

    return <Button onClick={clickHandler}><FontAwesomeIcon icon={faInfoCircle} /></Button>;
  };

  const columns = [
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
      name: 'Date Requested',
      selector: row => row.dateRequested,
      sortable: true,
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
      dispatch(getRequests(user.userId));
    }

  }, [user, navigate, dispatch]);

  return (
    <>
      <Breadcrumb role='Holder' page='Requests List' />

      <Link to="/holder/request">
        <MDBBtn color='primary' block><FontAwesomeIcon icon={faPlusCircle} /> Request Record</MDBBtn>
      </Link>

      <Row>
        <Col>
          <DataTable
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
                    <Form.Control as="textarea" readOnly defaultValue={currentRow.remarks} />
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
        </Modal.Footer>
      </Modal>

    </>
  );
};