import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col, Breadcrumb, Alert, Spinner } from 'react-bootstrap';

import { register } from '../../actions/auth';
import { setMessage, clearMessage } from '../../actions/message';


export default function Register(props) {
  const message = useSelector(state => state.message);

  const dispatch = useDispatch();

  const initialUserState = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccesful] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setLoading(true);

    const { username, password, confirmPassword, nationalId } = user;

    if (password !== confirmPassword) {
      dispatch(
        setMessage("Password and Confirm Password does not match.")
      );

      setLoading(false);
    } else {
      dispatch(
        register(username, password, props.roleName, nationalId)
      )
        .then(() => {
          setSuccesful(true);
          setLoading(false);

          dispatch(
            setMessage("User has been successfully registered.")
          );
        })
        .catch(() => {
          setSuccesful(false);
          setLoading(false);
        });
    }

  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    }
  }, [dispatch]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>{props.roleName}</Breadcrumb.Item>
        <Breadcrumb.Item active>Register</Breadcrumb.Item>
      </Breadcrumb>
      <Row className='mt-3'>
        <Col md={4}>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nationalId">
              <Form.Label>National Id</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="National Id"
                name="nationalId"
                value={user.nationalId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={user.confirmPassword}
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
                  {" "}Loading...
                </>
              ) : (
                <>Register</>
              )}
            </Button>

            {" "}
            {/* <Link to={`/${props.roleName.toLowerCase()}/login`}> */}
            <Link to={`/`}>
              <Button variant="secondary">Back</Button>
            </Link>

            {message && (
              <Alert className='mt-3' variant={successful ? "primary" : "danger"}>
                {message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}