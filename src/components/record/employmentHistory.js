import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Card, Form, Row, Col } from "react-bootstrap";

import { getRecordDetail, removeSelectedRecord } from "../../actions/record";

export default function EmploymentHistory({ nationalId }) {
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.record.selectedRecords);

  const { nationalIdParams } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return navigate("/");

    if (nationalId && nationalId !== "") dispatch(getRecordDetail(nationalId, "Employment History"));

    if (nationalIdParams && nationalIdParams !== "") dispatch(getRecordDetail(nationalIdParams, "Employment History"));

    return () => dispatch(removeSelectedRecord());
  }, [user, navigate, dispatch, nationalId, nationalIdParams]);

  return (
    <>
      {records &&
        records.map((record, index) => (
          <Card key={index}>
            <Card.Header>Employment History</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-4" controlId="nationalId">
                  <Form.Label column sm="2">
                    National Id
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control readOnly defaultValue={record.nationalId} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="companyName">
                  <Form.Label column sm="2">
                    Company Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control readOnly defaultValue={record.companyName} />
                  </Col>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="position">
                    <Form.Label>
                      Position
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.position} />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="dateStarted">
                    <Form.Label>
                      Date Started
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.dateStarted} />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="dateEnded">
                    <Form.Label>
                      Date Ended
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.dateEnded ? record.dateEnded : "Present"} />
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        ))
      }
    </>
  );
}