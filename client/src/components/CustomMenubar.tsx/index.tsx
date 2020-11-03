import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "semantic-ui-react";

const menubarLinkStyle = {
  color: "#ffffff",
};

export default function CustomMenubar() {
  return (
    <Menu pointing secondary size="massive" color="purple">
      <Menu.Item
        style={menubarLinkStyle}
        id="menubar-link"
        name="Home"
        active
        as={Link}
        to={"/"}
      />
      <div className="headerDivider"></div>
      <Search
        fluid
        id="searchbar"
        // loading={loading}
        // onResultSelect={(e, data) =>
        // dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
        // }
        placeholder="Find A Restaurant..."
        // onSearchChange={handleSearchChange}
        // results={results}
        // value={value}
      />
      <Menu.Menu position="right">
        <Menu.Item
          style={menubarLinkStyle}
          position="right"
          name="Login"
          as={Link}
          to={"/"}
        />
        <Menu.Item
          style={menubarLinkStyle}
          position="right"
          name="Register"
          as={Link}
          to={"/"}
        />
      </Menu.Menu>
    </Menu>
  );
}
