import React from "react";
import { Grid, Transition } from "semantic-ui-react";

import Review from "./Review";

export default function Reviews({ reviewsData, reviews_count }) {
  console.log(reviewsData);
  return (
    <Grid columns="three" divided>
      <Grid.Row>
        <h3>
          {reviews_count !== 0
            ? `${reviews_count} Reviews:`
            : "No reviews yet. Be the first one to review!"}
        </h3>
      </Grid.Row>
      <Grid.Row>
        <Transition.Group>
          {reviewsData.map(({ id, name, created_date, content, rating }) => (
            <Grid.Column key={id}>
              <Review
                id={id}
                name={name}
                created_date={created_date}
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
