import React from "react";
import { Card, Container, Icon } from "semantic-ui-react";

export default function About() {
  return (
    <>
      <Container>
        <h1 className="purple-bold-font">About</h1>
        <Card fluid id="reviews">
          <Card.Content style={{ padding: "30px" }}>
            <Card.Header className="purple-bold-font">
              <h1 className="purple-bold-font">
                <Icon name="utensils" bordered circular />
                 Yelp Clone Web Application
              </h1>
              <div className="about-font">
                <h2>A restaurant reviews web application.</h2>
                <h3>
                  Written in TypeScript, implemented with:
                  <ul>
                    <li>PostgreSQL</li>
                    <li>Express</li>
                    <li>React</li>
                    <li>Node</li>
                  </ul>
                </h3>
                <h3>
                  Users can find reviews and ratings for restaurants on the
                  site.
                </h3>
                <h3>
                  Once logged in, users can:
                  <ul>
                    <li>
                      Add, edit and remove restaurants available on the site.
                    </li>
                    <li>Add their reviews and ratings for restaurants.</li>
                  </ul>
                </h3>
              </div>
            </Card.Header>
          </Card.Content>
        </Card>
      </Container>
    </>
  );
}
