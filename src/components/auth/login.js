import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col, Breadcrumb, Alert, Spinner } from 'react-bootstrap';

import { login, logout } from '../../actions/auth';
import { setMessage, clearMessage } from '../../actions/message';

export default function Login(props) {
  const message = useSelector((state) => state.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialUserState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    const { username, password } = user;

    dispatch(
      login(username, password)
    )
      .then(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        if (loggedInUser.roleName === props.roleName) {
          navigate(`/${props.roleName.toLowerCase()}/list`);
        } else {
          dispatch(logout());
          dispatch(setMessage("User cannot access this page."));
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
        <Breadcrumb.Item active>Login</Breadcrumb.Item>
      </Breadcrumb>
      <Row className='mt-3'>
        <Col md={4}>
          <Form onSubmit={handleLogin}>
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
              ) :
                (
                  <>Login</>
                )}
            </Button>

            <Link to={`/${props.roleName.toLowerCase()}/register`}>
              <Button variant="link">
                Create an account
              </Button>
            </Link>

            {message && (
              <Alert className="mt-3" variant="danger">
                {message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}