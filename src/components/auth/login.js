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

export default function Login() {
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

        navigate(`/${loggedInUser.roleName.toLowerCase()}`);

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
          <img src="/images/verifiable_credentials.png" className='img-fluid' />
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
    </>
  );
}