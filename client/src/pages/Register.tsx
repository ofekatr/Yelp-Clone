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

export default (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors]: any = useState({});

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
                      error={errors.username}
                    ></Form.Input>
                    <Form.Input
                      name="email"
                      icon="envelope"
                      label="Email:"
                      placeholder="Email..."
                      type="email"
                      value={inputs.email}
                      onChange={onChange}
                      error={errors.email}
                    ></Form.Input>
                    <Form.Input
                      name="password"
                      icon="lock"
                      label="Password:"
                      placeholder="Password..."
                      error={errors.password}
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
                  {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                      <ul className="list">
                        {Object.values(errors).map((v) => (
                          <li key={v as string}>{v as string}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
};
