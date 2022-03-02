import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Card, Form, Row, Col } from "react-bootstrap";

import { getRecordDetail, removeSelectedRecord } from "../../actions/record";

export default function CriminalRecord({ nationalId }) {
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.record.selectedRecords);

  const { nationalIdParams } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return navigate("/");

    if (nationalId && nationalId !== "") dispatch(getRecordDetail(nationalId, "Criminal Record"));

    if (nationalIdParams && nationalIdParams !== "") dispatch(getRecordDetail(nationalIdParams, "Criminal Record"));

    return () => dispatch(removeSelectedRecord());
  }, [user, navigate, dispatch, nationalId, nationalIdParams]);

  return (
    <>
      {records &&
        records.map((record, index) => (
          <Card key={index}>
            <Card.Header>Criminal Record</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-4" controlId="nationalId">
                  <Form.Label column sm="1">
                    National Id
                  </Form.Label>
                  <Col sm="11">
                    <Form.Control readOnly defaultValue={record.nationalId} />
                  </Col>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="crimeCommitted">
                    <Form.Label>
                      Crime Committed
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.crimeCommitted ? (record.crimeCommitted) : "None"} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="dateCommitted">
                    <Form.Label>
                      Date Committed
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.dateCommitted ? (record.dateCommitted) : "N/A"} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="status">
                    <Form.Label>
                      Status
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.status} />
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