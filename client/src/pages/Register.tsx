import React, { useContext } from "react";
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
      console.error(err);
    }
  }

  return (
    <Container>
      <Grid flow columns="4">
        <Grid.Column></Grid.Column>
        <Grid.Column width="8">
          <Card style={{ borderRadius: "13px", padding: "15px" }} fluid>
            <Grid flow>
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
                      placeholder="Email..."
                      type="email"
                      value={inputs.email}
                      onChange={onChange}
                    ></Form.Input>
                    <Form.Input
                      name="password"
                      icon="lock"
                      label="Password:"
                      placeholder="Password..."
                      type="password"
                      value={inputs.password}
                      onChange={onChange}
                    ></Form.Input>
                    <Form.Input
                      name="confirmPassword"
                      icon="lock"
                      label="Confirm Password:"
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
