import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import "./Signup.css"
// import { useDispatch, useSelector } from "react-redux";
// import { createErrors } from '../../actions/errors';
// import { signupFromAPI } from '../../actions/auth';

function Signup() {
    
          // const dispatch = useDispatch();
          const usernameRef = useRef();
          const firstNameRef = useRef();
          const lastNameRef = useRef();
          const emailRef = useRef();
          const passwordRef = useRef();
          const passwordConfirmationRef = useRef();
          // const stateError = useSelector(store => store.errors);
          // const stateUser = useSelector(store => store.auth.user);
          // const [error, setError ] = useState('');
    
    
          // function handleSubmit(e) {
          //           e.preventDefault();
          //           if (passwordRef.current.value !== 
          //                     passwordConfirmationRef.current.value) {
          //                     return setError('Passwords do not match')
          //                     }
          //           try {
          //                     setError('');
          //                     dispatch(createErrors({}))
          //                     dispatch(signupFromAPI(usernameRef.current.value,
          //                               passwordRef.current.value,
          //                               firstNameRef.current.value,
          //                               lastNameRef.current.value,
          //                               emailRef.current.value));
          //           }catch(err){
          //                     console.log(err)
          //           }
          // }
   
          // if(stateUser && Object.keys(stateUser).length !== 0) {
          //           return <Redirect push to ="/"/>
          // }
    
          return (
                    <>
                              <Container className="d-flex align-items-center justify-content-center signUp-container"
                                        style={{ maxHeight: "100vh" }} >
                                        <div className="w-100" style={{ maxWidth: '400px'}}>
                                                  <Card>
                                                            <Card.Body>
                                                                      <h2 className="text-center mb-1">Register</h2>
                            
                                                                      {/* {error && <Alert variant="danger">{ error} </Alert> }
                                                                      {stateError.errors && Object.keys(stateError.errors).length !== 0 && 
                                                                      <Alert variant="danger">{ stateError.errors } </Alert> } */}

                                                                      <Form>                                                  
                                                                                <Form.Group id="username">
                                                                                          <Form.Label>User Name:</Form.Label>
                                                                                          <Form.Control type="username" ref={usernameRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="first-name">          
                                                                                          <Form.Label>First Name:</Form.Label>
                                                                                          <Form.Control type="first-name" ref={firstNameRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="last-name">
                                                                                          <Form.Label>Last Name:</Form.Label>
                                                                                          <Form.Control type ="last-name" ref={lastNameRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="email">
                                                                                          <Form.Label>email:</Form.Label>
                                                                                          <Form.Control type ="email" ref={emailRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="password">
                                                                                          <Form.Label>Password:</Form.Label>
                                                                                          <Form.Control type = "password" ref={passwordRef} required />
                                                                                </Form.Group>
                                                                                <Form.Group id="password-confirmation">
                                                                                          <Form.Label>Password Confirmation:</Form.Label>
                                                                                          <Form.Control type = "password" ref={passwordConfirmationRef} required />
                                                                                </Form.Group>
                                                                                <Button className="w-100 mt-2" type="submit">Sign Up</Button>
                                                                      </Form>
                                                            </Card.Body>
                                                  </Card>
                                        </div>
                              </Container>
                              <div className="w-100 text-center mt-2">
                              Already have an account? <Link to="/login" >Log In</Link>
                              </div>
                    </>
          )
}

export default Signup;