import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Divider } from "semantic-ui-react";
import RestaurantAPI from "../api/restaurants";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { AuthContext } from "../context/auth";

export default function RestaurantDetails(props: any) {
  const { id } = props.match.params;

  const { user }: any = useContext(AuthContext);

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
        console.log(selectedRestaurant);
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
          <h1 className="purple-bold-font">{selectedRestaurant.name}</h1>
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
                  onClick={ user ? () =>
                    setState({ ...state, displayAdd: !displayAdd }) : () => props.history.push("/login")
                  }
                />
              )}
              {displayAdd && (
                <AddReview
                  username={user.username}
                  state={state}
                  setState={setState}
                />
              )}
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
        <h1 className="purple-bold-font" style={{ textAlign: "center" }}>
          Restaurant Not Found.
        </h1>
      )}
    </>
  );
}
