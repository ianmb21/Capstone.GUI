import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col, Breadcrumb, Alert, Spinner, FloatingLabel, Card, Carousel } from 'react-bootstrap';

import { login, logout } from '../../actions/auth';
import { setMessage, clearMessage } from '../../actions/message';
import {
  MDBBtn,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBCard,
  MDBSpinner,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import CarouselHomepage from '../utilities/carouselHomepage';

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

        // if (loggedInUser.roleName === props.roleName) {
        navigate(`/${loggedInUser.roleName.toLowerCase()}`);
        // } else {
        //   dispatch(logout());
        //   dispatch(setMessage("User cannot access this page."));
        // }

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
      <MDBRow>
        <MDBCol md='8'>
          <CarouselHomepage />
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard className='mb-3' border='primary'>
            <MDBCardHeader>Login</MDBCardHeader>
            <MDBCardBody>
              <form onSubmit={handleLogin}>
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
                  className='mb-5'
                  type='password'
                  id='password'
                  label='Password'
                  name='password'
                  value={user.password}
                  onChange={handleInputChange} />

                <MDBBtn type='submit' className='mb-2' disabled={loading} block>
                  {loading ? (
                    <>
                      <MDBSpinner size='sm' className='me-2' color='light' />
                      Loading...
                    </>
                  ) : (<>Login</>)
                  }

                </MDBBtn>

                <Link to={`/holder/register`}>
                  <MDBBtn color='link' block>
                    Create a holder account
                  </MDBBtn>
                </Link>

              </form>
            </MDBCardBody>
          </MDBCard>

          {message && (
            <Alert variant="danger">
              {message}
            </Alert>
          )}
        </MDBCol>
      </MDBRow>


      {/* <Row className='mt-3'>
        <Col md={8}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>

              <Form onSubmit={handleLogin}>
                <FloatingLabel label="Username" className="mb-3" controlId="username">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3" controlId="password">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>

                <div className="d-grid gap-2">
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
                </div>

                <Link to={`/${props.roleName.toLowerCase()}/register`}>
                  <div className="d-grid gap-2">
                    <Button variant="link">
                      Create a holder account
                    </Button>
                  </div>
                </Link>

                {message && (
                  <Alert className="mt-3" variant="danger">
                    {message}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </>
  );
}