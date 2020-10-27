import React, { useContext, useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { RestaurantContext } from "../context";
import RestaurantFetcher from "../api/restaurants";

export default function DeleteButton(params) {
  const { id, callback }: { id: number; callback?: () => void } = params;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { restaurants, setRestaurants }: any = useContext(RestaurantContext);
  const deleteRestaurant = () => {
    RestaurantFetcher.delete(`/${id}`);
    setRestaurants(restaurants.filter((r) => r.id !== id));
    setConfirmOpen(false);
    if (callback) callback();
  };

  return (
    <>
      <Button
        color="red"
        onClick={() => setConfirmOpen(true)}
        style={{
          paddingRight: "6px",
          padding: "11px 4px 11px 10px",
        }}
      >
        Delete   
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteRestaurant}
      />
    </>
  );
}
