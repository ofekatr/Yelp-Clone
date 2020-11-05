import React from "react";
import { Popup } from "semantic-ui-react";

const style = {
    opacity: 0.7,
  }

const InvertedPopup = (props) => <Popup inverted style={style} {...props}/>;
export default InvertedPopup;