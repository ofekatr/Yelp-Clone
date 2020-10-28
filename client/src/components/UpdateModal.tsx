import React, { useContext } from "react";
import { Modal, Image, Header, Button, Icon } from "semantic-ui-react";
import _ from "lodash";

import { useForm } from "../utils/hooks";
import CustomForm from "./CustomForm";
import RestaurantFinder from "../api/restaurants";
import { RestaurantContext } from "../context";

export default function UpdateModal({ values }) {
  const { restaurants, setRestaurants }: any = useContext(RestaurantContext);
  function update() {
    if (inputs.price_range === 0) return;
    updateRestaurant(inputs);
    setOpen(false);
  }

  const { onChange, onSubmit, inputs, setInputs } = useForm(update, {
    ...values,
  });

  const updateRestaurant = ({ id, name, city, price_range }) => {
    try {
      RestaurantFinder.put(`/${id}`, { name, city, price_range });
    } catch (err) {
      console.error(err);
    }
    setRestaurants(
      restaurants.map((r) =>
        r.id === id ? { id, name, city, price_range } : r
      )
    );
  };

  const price_range_options: any = [...Array(6).keys()].slice(1).map((i) => ({
    key: i,
    text: "$".repeat(i),
    name: "price_range",
    value: `${i}`,
  }));

  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      onClose={() => {
        setInputs(_.cloneDeep(values));
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          inverted
          color="yellow"
          style={{
            paddingRight: "6px",
            padding: "11px 4px 11px 10px",
          }}
        >
          Update   
          <Icon name="refresh" />
        </Button>
      }
    >
      <Modal.Header>Update Restaurant Details</Modal.Header>
      <Modal.Content image>
        <Image
          size="medium"
          src="https://cdn0.iconfinder.com/data/icons/food-17/137/Food_icons_Cutlery-512.png"
          wrapped
        />
        <Modal.Description>
          <Header textAlign="center">Restaurant Details</Header>
          <CustomForm
            onSubmit={onSubmit}
            onChange={onChange}
            inputs={inputs}
            submitButton={
              <Button
                id="update-form-button"
                type="submit"
                size="large"
                content="Update"
              />
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
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setInputs(_.cloneDeep(values));
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        {/* <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
  );
}
