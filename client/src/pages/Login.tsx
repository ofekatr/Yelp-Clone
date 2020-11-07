import React, { useContext, useState } from "react";
// import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import AuthAPI from "../api/authentication";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
// import { LOGIN_USER } from "../utils/gqlQuerries";

export default function Login(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors]: any = useState();

  const { onChange, onSubmit, inputs } = useForm(() => login(), {
    username: "",
    password: "",
  });

  async function login() {
    try {
      context.login((await AuthAPI.post("/login", inputs)).data.user);
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
                <Header color="purple">Welcome Back!</Header>
              </Grid.Row>
              <Grid.Row>
                <div className="login-form-container">
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={"register-form"}
                  >
                    <Form.Input
                      name="username"
                      icon="user"
                      label="Username:"
                      required
                      error={errors && errors.errors && errors.errors.username}
                      placeholder="Username..."
                      type="text"
                      value={inputs.username}
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
                    <Grid>
                      <Grid.Column
                        textAlign="center"
                        style={{ marginTop: "15px" }}
                      >
                        <div>
                          <Button
                            type="submit"
                            color="purple"
                            content="Login"
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
                    Don't have an account?{" "}
                    <Link to="/register">Sign up today! </Link>
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
