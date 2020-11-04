import React, { useState, useContext } from "react";
// import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Container, Form, Grid, Header } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import AuthAPI from "../api/authentication";
import { AuthContext } from "../context/auth";
// import { LOGIN_USER } from "../utils/gqlQuerries";

export default (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, inputs } = useForm(() => login(), {
    username: "",
    password: "",
  });

  async function login() {
    try {
      context.login((await AuthAPI.post("/login", inputs)).data.user);
      props.history.push("/");
    } catch (err) {
      console.error(err.errors);
    }
  }

  //   const [loginUser, { loading }] = useMutation(LOGIN_USER, {
  //     update: (_, { data: { login: userData } }) => {
  //       context.login(userData);
  //       props.history.push("/");
  //     },
  //     onError: (err) => {
  //       setErrors({ ...err.graphQLErrors[0].extensions!.exception.errors });
  //     },
  //     variables: { ...inputs },
  //   });

  //   function login() {
  //     loginUser();
  //   }

  return (
    <Container>
      <Grid flow columns="4">
        <Grid.Column></Grid.Column>
        <Grid.Column width="8">
          <Card style={{ borderRadius: "13px", padding: "15px" }} fluid>
            <Grid flow>
              <Grid.Row className="page-title">
                <Header color="purple">Welcome Back!</Header>
              </Grid.Row>
              <Grid.Row>
                <div className="login-form-container">
                  <Form
                    onSubmit={onSubmit}
                    noValidate
                    className={"register-form"}
                    // className={loading ? "loading" : "register-form"}
                  >
                    <Form.Input
                      name="username"
                      icon="user"
                      label="Username:"
                      placeholder="Username..."
                      type="text"
                      value={inputs.username}
                      onChange={onChange}
                      error={errors.username}
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
                  {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                      <ul className="list">
                        {Object.values(errors).map((value: any) => (
                          <li key={value}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Grid.Row>
            </Grid>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
