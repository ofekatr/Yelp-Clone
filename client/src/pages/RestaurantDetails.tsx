import React, { useEffect, useState } from "react";
import { Button, Card, Container, Divider } from "semantic-ui-react";
import RestaurantFinder from "../api/restaurants";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";

export default function RestaurantDetails(props: any) {
  const { id } = props.match.params;
  const [state, setState] = useState({
    selectedRestaurant: null,
    displayAdd: false,
    error: false,
  } as any);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { restaurant: selectedRestaurant } = (
          await RestaurantFinder.get(`/${id}`)
        ).data.data;
        setState({ selectedRestaurant, error: !selectedRestaurant });
      } catch (err) {
        console.error(err);
        setState({ ...state, error: true });
      }
    };
    fetch();
  }, []);

  const { error, selectedRestaurant, displayAdd }: any = state;

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
              <Divider  />
              <div>
                <Reviews reviewsData={selectedRestaurant.reviews} />
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
