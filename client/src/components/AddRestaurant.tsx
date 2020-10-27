import React, { useContext } from "react";

import { useForm } from "../utils/hooks";
import CustomForm from "./CustomForm";
import RestaurantFinder from "../api/restaurants";
import { RestaurantContext } from "../context";

import _ from "lodash";

export default function AddRestaurant() {
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
    RestaurantFinder.post("/", restaurant);
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
    <div style={{ marginTop: "100px" }}>
      <CustomForm
        onSubmit={onSubmit}
        onChange={onChange}
        inputs={inputs}
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
      {/* <form onSubmit={onSubmit}>
        <Grid centered columns="3">
          <Grid.Row>
            <Grid.Column>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name.."
                  name="name"
                  id="name"
                  value={inputs.name}
                  onChange={onChange}
                  required
                />
                <label htmlFor="name" className="form__label">
                  Name..
                </label>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Location.."
                  name="city"
                  id="city"
                  value={inputs.city}
                  onChange={onChange}
                  required
                />
                <label htmlFor="city" className="form__label">
                  Location..
                </label>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Form.Dropdown
                fluid
                style={{ marginTop: "25px" }}
                selection
                name="price_range"
                placeholder="Price Range..."
                onChange={(e: any, data) => {
                  e.target.name = data.name;
                  e.target.value = data.value;
                  onChange(e);
                }}
                options={price_range_options}
                value={inputs.price_range}
              />
            </Grid.Column>
          </Grid.Row>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Button color="purple" size="large" type="submit">
              Add
            </Button>
          </div>
        </Grid>
      </form> */}
    </div>
  );
}
