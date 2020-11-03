import React, { useContext, useEffect } from "react";
import { Icon, Rating, Table } from "semantic-ui-react";
import RestaurantFinder from "../api/restaurants";
import { RestaurantContext } from "../context";
import range from "../utils/range";
import DeleteButton from "./DeleteButton";
import UpdateModal from "./UpdateModal";

export default function RestaurantsGrid({ style }) {
  const { restaurants, setRestaurants }: any = useContext(RestaurantContext);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { restaurants } = (await RestaurantFinder.get("/")).data.data;
        setRestaurants(restaurants);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [setRestaurants]);

  const deleteRestaurant = (id) => {
    try {
      RestaurantFinder.delete(`/${id}`);
    } catch (err) {
      console.error(err);
    }
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

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
            {restaurants.map(({ id, name, city, price_range }, i) => (
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
                      <Icon name="dollar sign" key={id.toString().repeat(j)} />
                    );
                  })}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <UpdateModal values={{ id, name, city, price_range }} />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Rating
                    disabled
                    icon="star"
                    size="large"
                    defaultRating={3}
                    maxRating={5}
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <DeleteButton callback={deleteRestaurant} id={id} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
