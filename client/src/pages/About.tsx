import React from "react";
import { Card, Container } from "semantic-ui-react";

export default function About() {
  return (
    <>
      <Container>
        <h1 className="purple-bold-font">About</h1>
        <Card fluid id="reviews">
          <Card.Content style={{ padding: "30px" }}></Card.Content>
        </Card>
      </Container>
    </>
  );
}
