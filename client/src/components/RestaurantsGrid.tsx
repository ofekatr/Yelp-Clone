import React, { useContext, useEffect } from "react";
import { Icon, Rating, Table } from "semantic-ui-react";
import RestaurantAPI from "../api/restaurants";
import { RestaurantContext } from "../context";
import range from "../utils/range";
import DeleteButton from "./DeleteButton";
import UpdateModal from "./UpdateModal";

export default function RestaurantsGrid({ style }) {
  const { restaurants, setRestaurants }: any = useContext(RestaurantContext);
  const ratingFontStyle = { color: "#FFD700", fontSize: "0.85em" };
  useEffect(() => {
    const fetch = async () => {
      try {
        const { restaurants } = (await RestaurantAPI.get("/")).data.data;
        setRestaurants(restaurants);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [setRestaurants]);

  const deleteRestaurant = (id) => {
    try {
      RestaurantAPI.delete(`/${id}`);
    } catch (err) {
      console.error(err);
    }
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  console.log(restaurants);
  return (
    <div style={style}>
      {restaurants && (
        <Table celled inverted striped style={{ borderRadius: "8px" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Restaurant</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Location</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Price Range
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Ratings</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {restaurants.map(
              ({ id, name, city, price_range, reviews_count }, i) => (
                <Table.Row key={id}>
                  <Table.Cell selectable>
                    <a
                      href={`/restaurants/${id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="utensils" /> {name}
                    </a>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{city}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {range(0, price_range).map((j) => {
                      return (
                        <Icon
                          name="dollar sign"
                          key={id.toString().repeat(j)}
                        />
                      );
                    })}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <UpdateModal values={{ id, name, city, price_range }} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {reviews_count == 0 ? (
                      <span style={ratingFontStyle}>No Reviews Yet.</span>
                    ) : (
                      <>
                        <Rating
                          basic
                          disabled
                          icon="star"
                          size="large"
                          defaultRating={3}
                          maxRating={5}
                        />
                        <span style={ratingFontStyle}>({reviews_count})</span>
                      </>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <DeleteButton callback={deleteRestaurant} id={id} />
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
