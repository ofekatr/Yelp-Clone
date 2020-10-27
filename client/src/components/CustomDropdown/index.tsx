import React from "react";
import { Form } from "semantic-ui-react";

const CustomDropdown = ({ options, name, placeholder, onChange, inputs }) => (
  <select
    className="ui selection dropdown"
    style={{ marginTop: "25px" }}
    onChange={onChange}
    name={name}
    value={inputs.price_range}
  >
    <option value={0}>
      {placeholder}
    </option>
    {options.map(({ key, text, value }) => (
      <option key={key} value={value}>
        {text}
      </option>
    ))}
  </select>
);

export default CustomDropdown;
