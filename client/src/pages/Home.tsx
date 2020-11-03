import React, { useState } from "react";
import { Button, Divider } from "semantic-ui-react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantsGrid from "../components/RestaurantsGrid";

export default function Home() {
  const [displayAdd, setDisplayAdd] = useState(false);
  return (
    <div>
      {displayAdd ? (
        <AddRestaurant style={{}} />
      ) : (
        <Button
          color="purple"
          circular
          icon="plus"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
          content="Add A Restaurant"
          onClick={() => setDisplayAdd(true)}
        />
      )}
      <Divider hidden />
      <RestaurantsGrid style={{}} />
    </div>
  );
}
