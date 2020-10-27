import React from "react";
import { Grid, Button } from "semantic-ui-react";

import "./index.scss";
import CustomDropdown from "../CustomDropdown";

const CustomForm = ({ onSubmit, onChange, inputs, fieldItems }) => {
  const TextInput = ({ placeholder, name }) => (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder={placeholder}
        name={name}
        id={name}
        value={inputs[name]}
        onChange={onChange}
        required
      />
      <label htmlFor={name} className="form__label">
        {placeholder}
      </label>
    </div>
  );

  const inputMapper = new Map([
    ["text", TextInput],
    ["dropdown", CustomDropdown],
  ]);

  return (
    <div>
      <form
        onSubmit={onSubmit}
      >
        <Grid centered columns="3">
          <Grid.Row>
            {fieldItems.map(({ name, placeholder, type, options }) => (
              <Grid.Column key={name}>
                {inputMapper.get(type)!({
                  name,
                  placeholder,
                  options,
                  onChange,
                  inputs,
                })}
              </Grid.Column>
            ))}
          </Grid.Row>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Button color="purple" size="large" type="submit">
              Add
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default CustomForm;
