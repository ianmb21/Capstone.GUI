import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Card, Form, Row, Col } from "react-bootstrap";

import { getRecordDetail, removeSelectedRecord } from "../../actions/record";

export default function CreditScore() {
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.record.selectedRecords);

  const { nationalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!user) {
      navigate("/");
    } else {
      if (nationalId && nationalId !== "") dispatch(getRecordDetail(nationalId, "Credit Score"));
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
            <Card.Header>Credit Score</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-4" controlId="nationalId">
                  <Form.Label column sm="2">
                    National Id
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control readOnly defaultValue={nationalId} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="bankDetails">
                  <Form.Label column sm="2">
                    Bank Name
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control readOnly defaultValue={record.bankName} />
                  </Col>
                  <Form.Label column sm="2">
                    Account Number
                  </Form.Label>
                  <Col sm="3">
                    <Form.Control readOnly defaultValue={record.accountNumber} />
                  </Col>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="creditStatus">
                    <Form.Label>
                      Credit Status
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.creditStatus} />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="scoreRange">
                    <Form.Label>
                      Score Range
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.scoreRange} />
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