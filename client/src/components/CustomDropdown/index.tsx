import React from "react";
import { Form } from "semantic-ui-react";

const CustomDropdown = ({ options, name, placeholder, onChange, inputs }) => (
  <Form.Dropdown
    fluid
    style={{ marginTop: "25px" }}
    selection
    name={name}
    placeholder={placeholder}
    onChange={(e: any, data) => {
      e.target.name = data.name;
      e.target.value = data.value;
      onChange(e);
    }}
    options={options}
    value={inputs.price_range}
  />
);

export default CustomDropdown;
