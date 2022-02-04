import { Form, Button, Row, Col, Alert, Spinner, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { searchHolder, createRequest, getRecordType } from '../../actions/verifier';
import { setMessage, clearMessage } from '../../actions/message';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

    useEffect(() => {
        setRequest({
            ...request
            , nationalId: currentRow.nationalId
            , firstName: currentRow.firstName
            , lastName: currentRow.lastName
            , birthdate: currentRow.birthDate
            , remarks: ""
        });
    }, [show])

    const ActionComponent = ({ row, onClick }) => {
        const clickHandler = () => onClick(row);

        return <Button onClick={clickHandler}>Select</Button>;
    };

    const columns = [
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

        const { nationalId, firstName, lastName, birthdate, recordTypeIds, remarks } = request;

        if (!Array.isArray(recordTypeIds) || !recordTypeIds.length) {
            dispatch(setMessage("Please select a Record Type."));

            setLoading(false);
        } else {
            dispatch(createRequest(user.userId, nationalId, firstName, lastName, birthdate, recordTypeIds, remarks))

                .then(() => {

                    setLoading(false);

                    dispatch(setMessage("Request/s has been successfully created."));

                    setShow(false);

                    setShowMessage(true);
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
            navigate("/verifier/login");
        } else {
            dispatch(searchHolder(search.firstName, search.lastName))
            dispatch(getRecordType(user.userId));
        }
        return () => {
            dispatch(clearMessage());
        }

    }, [user, navigate, dispatch]);

    return (
        <>
            <Link to="/verifier/list">
                <Button variant="secondary" className="mb-3"><FontAwesomeIcon icon={faArrowLeft} /> Return to request list</Button>
            </Link>
            <br>
            </br>
            <Col md={4}>
                <Form className="mb-3" onSubmit={handleSearch}>
                    
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name*</Form.Label>
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
                        <Form.Label>Last Name*</Form.Label>
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
            </Col>
            <br>
            </br>
            <Row>
                <h4>Holder Lists</h4>
            </Row>

            <Row>
                <Col>
                    <DataTable
                        columns={columns}
                        data={holderList}
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
                        Request record for '{currentRow.firstName} {currentRow.middleName} {currentRow.lastName}''
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
                            }
                            return (
                                <Form.Check
                                    type="checkbox"
                                    id={data.recordTypeId}
                                    label={labelName}
                                    value={data.recordTypeId}
                                    onChange={handleCheckboxChange}
                                />
                            )
                        })}
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="remarks">
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