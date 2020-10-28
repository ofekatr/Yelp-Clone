import React, { useContext } from "react";

import { useForm } from "../utils/hooks";
import CustomForm from "./CustomForm";
import RestaurantFinder from "../api/restaurants";
import { RestaurantContext } from "../context";

import _ from "lodash";
import { Button } from "semantic-ui-react";

export default function AddRestaurant({ style }) {
  const { restaurants, setRestaurants }: any = useContext(RestaurantContext);

  const initState: { name: string; city: string; price_range: number } = {
    name: "",
    city: "",
    price_range: 0,
  };

  function add() {
    if (inputs.price_range === 0) return;
    createRestaurant(inputs);
    setInputs(_.cloneDeep(initState));
  }

  let { onChange, onSubmit, inputs, setInputs } = useForm(
    () => add(),
    _.cloneDeep(initState)
  );

  const createRestaurant = (restaurant) => {
    try {
      RestaurantFinder.post("/", restaurant);
    } catch (err) {
      console.error(err);
    }
    setRestaurants([...restaurants, { ...restaurant, id: 0 }]);
    inputs = _.cloneDeep(initState);
  };

  const price_range_options: any = [...Array(6).keys()].slice(1).map((i) => ({
    key: i,
    text: "$".repeat(i),
    name: "price_range",
    value: `${i}`,
  }));

  return (
    <div style={style}>
      <CustomForm
        onSubmit={onSubmit}
        onChange={onChange}
        inputs={inputs}
        submitButton={
          <Button color="purple" size="large" type="submit" content="Add" />
        }
        fieldItems={[
          { type: "text", placeholder: "Name...", name: "name" },
          { type: "text", placeholder: "Location...", name: "city" },
          {
            type: "dropdown",
            placeholder: "Price Range...",
            name: "price_range",
            options: price_range_options,
          },
        ]}
      />
    </div>
  );
}
