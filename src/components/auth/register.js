import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'react-bootstrap';
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

import { register } from '../../actions/auth';
import { setMessage, clearMessage } from '../../actions/message';

export default function Register({ roleName }) {
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
      return
    }

    dispatch(
      register(username, password, roleName, nationalId)
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
                  ) : (<>Register</>)}
                </MDBBtn>

                <Link to='/'>
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
    </>
  );
}