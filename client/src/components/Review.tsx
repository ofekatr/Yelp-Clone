import moment from "moment";
import React from "react";
import { Card, Rating } from "semantic-ui-react";

export default function Review({ id, name, createdDate, content, rating }) {
  return (
    <Card fluid id="review-card">
      <Card.Content>
        <Card.Header>
          <span>{name}</span>
          <span style={{ float: "right" }}>
            <Rating
              disabled
              size="large"
              icon="star"
              maxRating={5}
              rating={rating}
            />
          </span>
        </Card.Header>
        <Card.Meta>{moment(createdDate).fromNow()}</Card.Meta>
        <Card.Description>{content}</Card.Description>
      </Card.Content>
    </Card>
  );
}
