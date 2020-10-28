import React, { useEffect, useState } from "react";
import RestaurantFinder from "../api/restaurants";

export default function RestaurantDetails(props: any) {
  const { id } = props.match.params;
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { restaurant } = (await RestaurantFinder.get(`/${id}`)).data.data;
        setSelectedRestaurant(restaurant);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);
return <div></div>;
}
