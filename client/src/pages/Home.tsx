import React from "react";
import { Divider, Header } from "semantic-ui-react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantsGrid from "../components/RestaurantsGrid";

export default function Home() {
  return (
    <div>
      <Header size="huge">Home</Header>
      <AddRestaurant style={{}} />
      <Divider hidden />
      <RestaurantsGrid style={{}} />
    </div>
  );
}
