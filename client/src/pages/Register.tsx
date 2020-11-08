import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";

import AuthAPI from "../api/authentication";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors]: any = useState();
  const { onChange, onSubmit, inputs } = useForm(() => register(), {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function register() {
    try {
      context.login((await AuthAPI.post("/register", inputs)).data.user);
      props.history.push("/");
    } catch (err) {
      if (err.response && err.response.data) setErrors(err.response.data);
    }
  }

  return (
    <Container>
      <Grid columns="4">
        <Grid.Column></Grid.Column>
        <Grid.Column width="8">
          <Card style={{ borderRadius: "13px", padding: "15px" }} fluid>
            <Grid>
              <Grid.Row className="page-title">
                <Header color="purple">Join Today!</Header>
              </Grid.Row>
              <Grid.Row>
                <div className="login-form-container">
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    // className={loading ? "loading" : "register-form"}
                  >
                    <Form.Input
                      icon="user"
                      name="username"
                      label="Username:"
                      required
                      error={errors && errors.errors && errors.errors.username}
                      placeholder="Username..."
                      //   width="4"
                      type="text"
                      value={inputs.username}
                      onChange={onChange}
                    ></Form.Input>
                    <Form.Input
                      name="email"
                      icon="envelope"
                      label="Email:"
                      required
                      error={errors && errors.errors && errors.errors.email}
                      placeholder="Email..."
                      type="email"
                      value={inputs.email}
                      onChange={onChange}
                    ></Form.Input>
                    <Form.Input
                      name="password"
                      icon="lock"
                      label="Password:"
                      required
                      error={errors && errors.errors && errors.errors.password}
                      placeholder="Password..."
                      type="password"
                      value={inputs.password}
                      onChange={onChange}
                    ></Form.Input>
                    <Form.Input
                      name="confirmPassword"
                      icon="lock"
                      label="Confirm Password:"
                      required
                      error={errors && errors.errors && errors.errors.password}
                      placeholder="Confirm..."
                      type="password"
                      value={inputs.confirmPassword}
                      onChange={onChange}
                    ></Form.Input>
                    <Grid>
                      <Grid.Column
                        textAlign="center"
                        style={{ marginTop: "15px" }}
                      >
                        <div>
                          <Button
                            type="submit"
                            color="purple"
                            content="Register"
                            style={{ marginBottom: "20px" }}
                          />
                        </div>
                      </Grid.Column>
                    </Grid>
                  </Form>
                </div>
                <div style={{ margin: "auto" }}>
                  {errors && (
                    <div className="ui error message">
                      {errors.message}
                      <ul>
                        {errors.errors &&
                          Object.keys(errors.errors).map((e) => (
                            <li key={e}>{errors.errors[e]}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  <Segment>
                    Already have an account? <Link to="/login">Sign in</Link>
                  </Segment>
                </div>
              </Grid.Row>
            </Grid>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
