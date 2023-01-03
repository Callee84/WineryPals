import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../context/CurrentUser";

function LogInForm() {
  const setCurrentUser = useSetCurrentUser();

  const [logInData, setLogInData] = useState ({
    username: "",
    password: "",
  });
  const {username, password} = logInData;
  
  const [errors, setErrors] = useState({});
  
  const history = useHistory();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  
  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Log in</h1>
          <br />
          <p className={styles.FormP}>And share your love of wine to fellow Winerypals</p>

          <Form onSubmit={handleSubmit}> 
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                        className={styles.Input}
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
                        className={styles.Input}
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Button 
                    className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Burgundy}`}
                    type="submit" >
                    Log In
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
            Don't have a Winerypal-account? 
          
            <Link to="/signup">
            <span> Create one here!</span>
          </Link>
          </p>
          </div>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.SideImage}`}
          src={"https://res.cloudinary.com/drlxdx65k/image/upload/c_scale,h_350/v1672655143/log_in_img_mryhdw.jpg"}
        />
      </Col>
    </Row>
  );
}

export default LogInForm;