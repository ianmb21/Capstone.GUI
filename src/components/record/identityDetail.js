import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Card, Form, Row, Col } from "react-bootstrap";

import { getRecordDetail, removeSelectedRecord } from "../../actions/record";

export default function IdentityDetail() {
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.record.selectedRecords);

  const { nationalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!user) {
      navigate("/");
    } else {
      if (nationalId && nationalId !== "") dispatch(getRecordDetail(nationalId, "Identity Detail"));
    }

    return () => {
      dispatch(removeSelectedRecord());
    }

  }, [user, navigate, dispatch, nationalId]);

  console.log(records);

  return (
    <>
      {records &&
        records.map((record, index) => (
          <Card key={index}>
            <Card.Header>Identity Detail</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-4" controlId="nationalId">
                  <Form.Label column sm="1">
                    National Id
                  </Form.Label>
                  <Col sm="11">
                    <Form.Control readOnly defaultValue={nationalId} />
                  </Col>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="firstName">
                    <Form.Label>
                      First Name
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.firstName} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="middleName">
                    <Form.Label>
                      Middle Name
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.middleName} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="lastName">
                    <Form.Label>
                      Last Name
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.lastName} />
                  </Form.Group>
                </Row>

                <Form.Group as={Row} className="mb-3" controlId="genderBirthdate">
                  <Form.Label column sm="1">
                    Gender
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control readOnly defaultValue={record.gender} />
                  </Col>
                  <Form.Label column sm="1">
                    Birthdate
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control readOnly defaultValue={record.birthDate.substr(0,10)} />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        ))
      }
    </>
  );
}