import React from "react";
import { Grid, Transition } from "semantic-ui-react";
import Review from "./Review";

export default function Reviews({ reviewsData }) {
  return (
    <Grid columns="three" divided>
      <Grid.Row>
        <Transition.Group>
          {reviewsData.map(({ id, name, createdDate, content, rating }) => (
            <Grid.Column key={id}>
              <Review
                id={id}
                name={name}
                createdDate={createdDate}
                content={content}
                rating={rating}
              />
            </Grid.Column>
          ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}
