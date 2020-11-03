import React, { useEffect, useState } from "react";
import { Button, Card, Container, Divider } from "semantic-ui-react";
import RestaurantAPI from "../api/restaurants";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";

export default function RestaurantDetails(props: any) {
  const { id } = props.match.params;
  const [state, setState] = useState({
    selectedRestaurant: null,
    displayAdd: false,
    error: false,
  } as any);

  const { error, selectedRestaurant, displayAdd }: any = state;

  useEffect(() => {
    const fetch = async () => {
      try {
        const { restaurant: selectedRestaurant } = (
          await RestaurantAPI.get(`/${id}`)
        ).data.data;
        setState({ selectedRestaurant, error: !selectedRestaurant });
      } catch (err) {
        console.error(err);
        setState({ ...state, error: true });
      }
    };
    fetch();
  }, []);

  return (
    <>
      {selectedRestaurant && (
        <Container>
          <h1>{selectedRestaurant.name}</h1>
          <Card fluid id="reviews">
            <Card.Content style={{ padding: "30px" }}>
              {!displayAdd && (
                <Button
                  color="purple"
                  circular
                  icon="plus"
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                  content="Add A Review"
                  onClick={() =>
                    setState({ ...state, displayAdd: !displayAdd })
                  }
                />
              )}
              {displayAdd && <AddReview state={state} setState={setState} />}
              <Divider />
              <div>
                <Reviews
                  reviews_count={selectedRestaurant.reviews_count}
                  reviewsData={selectedRestaurant.reviews}
                />
              </div>
            </Card.Content>
          </Card>
        </Container>
      )}
      {error && (
        <h1 style={{ textAlign: "center", color: "#B413EC" }}>
          Restaurant Not Found.
        </h1>
      )}
    </>
  );
}
