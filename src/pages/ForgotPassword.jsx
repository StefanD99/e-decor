import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { sendForgotPasswordEmail } from "../context/authContext/authActions";
import "./forgotPassword.css";

function ForgotPassword() {

    const [values, setValues] = useState({
        email: '',
        error: '',
        loading: false
    });

    let {email, error, loading} = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setValues({
                ...values,
                error: 'Please provide valid email address!'
            });
            return;
        }
        setValues({
            ...values,
            error: '',
            loading: true
        });
        const sendEmailResult = await sendForgotPasswordEmail(email);
        if (sendEmailResult) {
            // Show alert
            setValues({
                ...values,
                email: '',
                loading: false
            });
        } else {
            // Show alert
            setValues({
                ...values,
                loading: false
            });
        }
    };

    return (
        <Container className="mt-5 custom-container form-container">
            <h3 className="text-center">Forgot your password?</h3>
            <p className="text-center text-danger">{error}</p>
            <Row className="justify-content-md-center row-form py-2">
                <Col md={6}>
                    <Form className="shadow rounded p-3 m-3 form" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                className="form-input"
                                value={email} 
                                type="email" 
                                placeholder="Enter email" 
                                name='email' 
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                Enter email to which your reset password link will be sent
                            </Form.Text>
                        </Form.Group>
                        <Button className="btn-form" disabled={loading} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default ForgotPassword;
