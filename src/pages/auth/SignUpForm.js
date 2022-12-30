import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    password_confirm: "",
  });
const { username, password, password_confirm } = signUpData;

const [errors, setErrors] = useState({});

const history = useHistory();

const handleChange = (event) => {
  setSignUpData({
    ...signUpData,
    [event.target.name]: event.target.value,
  });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("/dj-rest-auth/registration/", signUpData);
    history.push("/signin");
  } catch (err) {
    setErrors(err.response?.data);
  }
};

return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign up</h1>
          <br />
          <p>Then you get access to all the features and get to meet fellow Winepals!</p>


          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                name="password"
                value={password}
                onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
              ))}

              <Form.Group className="mb-3" controlId="password_confirm">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Confirm Password"
                name="password_confirm"
                value={password_confirm}
                onChange={handleChange} 
                />
              </Form.Group>
              {errors.password_confirm?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
              ))}

              <Button 
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Burgundy}`} type="submit">
                Sign up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
            </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <div className={styles.Link} >
          <p>
            Already have an account? 
          
            <Link to="/signin">
            <span> Sign in</span>
          </Link>
          </p>
          </div>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/drlxdx65k/image/upload/ar_16:9,c_fill,e_sharpen,g_auto,h_350,w_450/v1672415328/winerypals_signup_aud6mm.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;