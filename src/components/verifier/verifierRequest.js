import { Form, Button, Row, Col, Breadcrumb, Spinner, Table, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { searchHolder, createRequest, getRecordType } from '../../actions/verifier';
import { setMessage, clearMessage } from '../../actions/message';
import VerifierService from '../../services/verifierService';
import DataTable from 'react-data-table-component';

export default function VerifierRequest() {
    const user = useSelector((state) => state.auth.user);
    const holderList = useSelector((state) => state.verifier.holderSearch);
    const subRoleMatrix = useSelector((state) => state.verifier.recordTypeId);
    const [recordTypeIDs, setRecordTypeIDs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isSearching, setIsSearching] = useState(false);

    const [currentRow, setCurrentRow] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialSearchState = {
        firstName: "",
        lastName: ""
    };

    const [search, setSearch] = useState(initialSearchState);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (row) => {
        setShow(true);
        setCurrentRow(row);
        
        console.log(request);
    };

    useEffect(() => {
        setRequest({ ...request
            , nationalId: currentRow.nationalId
            , firstName: currentRow.firstName
            , lastName: currentRow.lastName
            , birthdate: currentRow.birthDate
            , remarks: ""
        });
        console.log(request);
    },[show])

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

    const data = {
        firstName: currentRow.firstName,
        middleName: currentRow.middleName,
        lastName: currentRow.lastName,
        nationalId: currentRow.nationalId,
        birthDate: currentRow.birthDate
    }

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
        console.log(search);
    }

    const handlePurposeChange = (e) => {
        const { name, value } = e.target;
        setRequest({ ...request, [name]: value });
        console.log(request);
    }

    const handleRequest = (e) => {
        e.preventDefault();
    
        setLoading(true);

        const { nationalId, firstName, lastName, birthdate, recordTypeIds, remarks } = request;

        console.log(request);
    
        if (!Array.isArray(recordTypeIds) || !recordTypeIds.length) {
          dispatch(setMessage("Please select a Record Type."));
          console.log("Please select a Record Type.");
    
          setLoading(false);
        } else {
          dispatch(createRequest(user.userId, nationalId, firstName, lastName, birthdate, recordTypeIds, remarks))
            .then(() => {
              setLoading(false);
              console.log("Request/s has been successfully created.");
    
              dispatch(setMessage("Request/s has been successfully created."));
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
            alert(JSON.stringify(subRoleMatrix));
            console.log(subRoleMatrix);
        }


        return () => {
            dispatch(clearMessage());
        }

    }, [user, navigate, dispatch]);

    return (
        <>
            <Form onSubmit={handleSearch}>
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
                        <>Search</>
                    )}
                </Button>

                {" "}
                <Link to="/verifier/list">
                    <Button variant="secondary">Back</Button>
                </Link>
            </Form>
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
                        {currentRow.firstName} {currentRow.middleName} {currentRow.lastName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

        </>
    );
}