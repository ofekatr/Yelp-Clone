import React from "react";
import { Grid, Transition } from "semantic-ui-react";

import Review from "./Review";

export default function Reviews({ reviewsData, reviews_count }) {
  return (
    <Grid columns="three" divided>
      <Grid.Row>
        <h3>
          {(reviews_count as number) === 0
            ? "No reviews yet. Be the first one to review!"
            : `${reviews_count} Review(s):`}
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
