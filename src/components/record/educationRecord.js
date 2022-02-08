import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Card, Form, Row, Col } from "react-bootstrap";

import { getRecordDetail, removeSelectedRecord } from "../../actions/record";

export default function EducationRecord({ nationalId }) {
  const user = useSelector((state) => state.auth.user);
  const records = useSelector((state) => state.record.selectedRecords);

  const { nationalIdParams } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!user) {
      navigate("/");
    } else {
      if (nationalId && nationalId !== "") dispatch(getRecordDetail(nationalId, "Education Record"));
      if (nationalIdParams && nationalIdParams !== "") dispatch(getRecordDetail(nationalIdParams, "Education Record"));
    }

    // return () => {
    //   dispatch(removeSelectedRecord());
    // }

  }, [user, navigate, dispatch, nationalId]);

  console.log(records);

  return (
    <>
      {records &&
        records.map((record, index) => (
          <Card key={index}>
            <Card.Header>Education Record</Card.Header>
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

                <Form.Group as={Row} className="mb-3" controlId="course">
                  <Form.Label column sm="1">
                    Course
                  </Form.Label>
                  <Col sm="11">
                    <Form.Control readOnly defaultValue={record.course} />
                  </Col>
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="schoolName">
                    <Form.Label>
                      School Name
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.schoolName} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="levelOfEducation">
                    <Form.Label>
                      Level of Education
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.levelOfEducation} />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="yearGraduated">
                    <Form.Label>
                      Year Graduated
                    </Form.Label>
                    <Form.Control readOnly defaultValue={record.yearGraduated} />
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