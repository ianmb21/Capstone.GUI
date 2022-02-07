import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col, Breadcrumb, Alert, Spinner } from 'react-bootstrap';

import { register } from '../../actions/auth';
import { setMessage, clearMessage } from '../../actions/message';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBSpinner,
} from 'mdb-react-ui-kit';


export default function Register(props) {
  const message = useSelector(state => state.message);

  const dispatch = useDispatch();

  const initialUserState = {
    username: "",
    password: "",
    nationalId: "",
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
            setMessage("Holder account has been successfully registered.")
          );
        })
        .catch(() => {
          setSuccesful(false);
          setLoading(false);

          dispatch(
            setMessage("An unexpected error has occured.")
          );
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
      <MDBRow>
        <MDBCol lg='4'></MDBCol>
        <MDBCol lg='4'>
          <MDBCard border='primary'>
            <MDBCardHeader>Create a Holder Account</MDBCardHeader>
            <MDBCardBody>
              <form onSubmit={handleRegister}>
                <MDBInput
                  required
                  className='mb-4'
                  id='username'
                  label='Username'
                  name='username'
                  value={user.username}
                  onChange={handleInputChange} />
                  <MDBInput
                    required
                    className='mb-4'
                    id='nationalId'
                    label='National Id'
                    name='nationalId'
                    value={user.nationalId}
                    onChange={handleInputChange} />
                <MDBInput
                  required
                  className='mb-4'
                  type='password'
                  id='password'
                  label='Password'
                  name='password'
                  value={user.password}
                  onChange={handleInputChange} />
                <MDBInput
                  required
                  className='mb-5'
                  type='password'
                  id='confirmPassword'
                  label='Confirm Password'
                  name='confirmPassword'
                  value={user.confirmPassword}
                  onChange={handleInputChange} />

                <MDBBtn type='submit' className='mb-2' disabled={loading} block>
                  {loading ? (
                    <>
                      <MDBSpinner size='sm' className='me-2' color='light' />
                      Loading...
                    </>
                  ) : (<>Register</>)
                  }

                </MDBBtn>

                <Link to={`/`}>
                  <MDBBtn color='link' block>
                    Cancel
                  </MDBBtn>
                </Link>

              </form>
            </MDBCardBody>
          </MDBCard>

          {message && (
            <Alert className='mt-3' variant={successful ? "primary" : "danger"}>
              {message}
            </Alert>
          )}
        </MDBCol>
        <MDBCol lg='4'></MDBCol>
      </MDBRow>


      {/* <Breadcrumb>
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
            <Link to={`/${props.roleName.toLowerCase()}/login`}> 
      <Link to={`/`}>
        <Button variant="secondary">Back</Button>
      </Link>

      {message && (
        <Alert className='mt-3' variant={successful ? "primary" : "danger"}>
          {message}
        </Alert>
      )}
    </Form>
        </Col >
      </Row > */}
    </>
  );
}