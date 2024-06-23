import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./register.css";
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext/AuthContext';
import { registerUser } from '../context/authContext/authActions';
import ActionTypes from '../context/authContext/authActionTypes';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alertContext/AlertContext';

function Register() {

    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const {showAlert} = useContext(AlertContext);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        city: '',
        address: '',
        postalCode: '',
        error: '',
        isConfirmed: false,
        loading: false
    });

    const {firstName, lastName, userName, email, password, confirmPassword, country, city, address, postalCode, error, isConfirmed, loading} = values;
    let regexPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !country || !city || !address || !postalCode || isConfirmed === false) {
            setValues({
                ...values,
                error: 'Please fill in all mandatory fields!'
            });
            return;
        }
        if (password !== confirmPassword) {
            setValues({
                ...values,
                error: 'Password must match!'
            });
            return;
        }
        if (!regexPasswordPattern.test(password)) {
            setValues({
                ...values,
                error: 'Password must be at least of 8 characters, containing at least one letter and one number'
            });
            return;
        }
        setValues({
            ...values,
            error: '',
            loading: true
        });

        const formDate = {
            firstName,
            lastName,
            userName,
            email,
            password,
            country,
            city,
            address,
            postalCode
        }

        const user = await registerUser(formDate);

        if (user) {
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload: user
            });
            setValues({
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                country: '',
                city: '',
                address: '',
                postalCode: '',
                error: '',
                isConfirmed: false
            });
            showAlert('You have successfully registered!');
            navigate('/home');
        } else {
            dispatch({
                type: ActionTypes.REGISTER_ERROR,
            });
            showAlert('Ooops! Something went wrong. Please try again later!', 'danger');
        }
        setValues({
            ...values,
            loading: false
        });
    };

  return (
    <Container className='mt-5 custom-container'>
         <h3 className='text-center'>Create your Account</h3>
         <p className='text-center text-danger mt-4'>{error}</p>
         <Row className="justify-content-md-center row-form">
           <Col md={7}>
             <Form onSubmit={handleSubmit} className='shadow rounded p-3 m-3 form'>
               <Form.Group className="mb-3" controlId="formFirstName">
                 <Form.Label>First Name</Form.Label>
                 <Form.Control onChange={handleChange} value={firstName} className='form-input' type="text" placeholder="Enter first name" name='firstName' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formLastName">
                 <Form.Label>Last Name</Form.Label>
                 <Form.Control onChange={handleChange} value={lastName} className='form-input' type="text" placeholder="Enter last name" name='lastName' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formUserName">
                 <Form.Label>User Name</Form.Label>
                 <Form.Control onChange={handleChange} value={userName} className='form-input' type="text" placeholder="Enter user name" name='userName' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control onChange={handleChange} value={email} className='form-input' type="email" placeholder="Enter email" name='email' />
                 <Form.Text className="text-muted">
                   Your email will not be shared with anyone!
                 </Form.Text>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control onChange={handleChange} value={password} className='form-input' type="password" placeholder="Password" name='password' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formConfirmPassword">
                 <Form.Label>Confirm Password</Form.Label>
                 <Form.Control onChange={handleChange} value={confirmPassword} className='form-input' type="password" placeholder="Confirm Password" name='confirmPassword' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formCountry">
                 <Form.Label>Country</Form.Label>
                 <Form.Control onChange={handleChange} value={country} className='form-input' type="text" placeholder="Enter your country" name='country' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formCity">
                 <Form.Label>City</Form.Label>
                 <Form.Control onChange={handleChange} value={city} className='form-input' type="text" placeholder="Enter your city" name='city' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formAddress">
                 <Form.Label>Address</Form.Label>
                 <Form.Control onChange={handleChange} value={address} className='form-input' type="text" placeholder="Enter your address" name='address' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formPostalCode">
                 <Form.Label>Postal Code</Form.Label>
                 <Form.Control onChange={handleChange} value={postalCode} className='form-input' type="text" placeholder="Enter postal code" name='postalCode' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                 <Form.Check onChange={handleChange} value={isConfirmed} type="checkbox" label="I accept terms & conditions." name='isConfirmed' />
               </Form.Group>
               <Button className='btn-form' disabled={loading} type="submit">
                 Create Account
               </Button>
             </Form>
           </Col>
         </Row>
       </Container>
  );
}

export default Register;