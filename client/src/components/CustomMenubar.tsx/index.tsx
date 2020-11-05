import React, { useState, MouseEvent, useContext } from "react";
import { Menu, MenuItemProps, Search, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import InvertedPopup from "../InvertedPopup";

function Menubar(props) {
  const { user, logout }: any = useContext(AuthContext);
  const pathname = window.location.pathname.substr(1);
  const path = pathname === "" ? "home" : pathname;
  const [activeItem, setActiveItem] = useState<string>(path);

  const handleItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    { name }: MenuItemProps
  ) => setActiveItem(name as React.SetStateAction<string>);

  function onLogout() {
    logout();
    props.history.push("/");
  }

  const menuItemStyle = {
    color: "white",
  };

  return (
    <>
      {user ? (
        <Menu pointing secondary id="menubar" size="massive" color="purple">
          <Menu.Item
            name={user.username}
            active
            onClick={() => setActiveItem("home")}
            style={menuItemStyle}
            as={Link}
            to={"/"}
          />
          <div className="headerDivider"></div>
          <span style={{ paddingTop: "7px" }}>
            <Search
              fluid
              id="searchbar"
              size="mini"
              // loading={loading}
              // onResultSelect={(e, data) =>
              // dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
              // }
              placeholder="Find A Restaurant..."
            />
          </span>
          <Menu.Menu position="right" color="black">
            <InvertedPopup
              position="top center"
              content="About"
              trigger={
                <Menu.Item
                  name="about"
                  active={activeItem === "about"}
                  style={menuItemStyle}
                  onClick={handleItemClick}
                  as={Link}
                  to={"/about"}
                />
              }
            />
            <InvertedPopup
              position="top center"
              content="Logout"
              trigger={
                <Menu.Item
                  name="logout"
                  style={menuItemStyle}
                  onClick={() => onLogout()}
                />
              }
            />
            <InvertedPopup
              position="top center"
              content="Go to Repository!"
              trigger={
                <Menu.Item
                  icon="github"
                  size="big"
                  target="_blank"
                  style={menuItemStyle}
                  href="https://github.com/ofekatr/Yelp-Clone"
                />
              }
            />
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu pointing secondary id="menubar" size="massive" color="purple">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            style={menuItemStyle}
            to={"/"}
          />
          <div className="headerDivider"></div>
          <span style={{ paddingTop: "7px" }}>
            <Search
              fluid
              id="searchbar"
              size="mini"
              // loading={loading}
              // onResultSelect={(e, data) =>
              // dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
              // }
              placeholder="Find A Restaurant..."
              // onSearchChange={handleSearchChange}
              // results={results}
              // value={value}
            />
          </span>

          <Menu.Menu position="right">
            <InvertedPopup
              position="top center"
              content="About"
              trigger={
                <Menu.Item
                  name="about"
                  active={activeItem === "about"}
                  style={menuItemStyle}
                  onClick={handleItemClick}
                  as={Link}
                  to={"/about"}
                />
              }
            />
            <InvertedPopup
              position="top center"
              content="Login"
              trigger={
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  style={menuItemStyle}
                  onClick={handleItemClick}
                  as={Link}
                  to={"/login"}
                />
              }
            />
            <InvertedPopup
              position="top center"
              content="Register"
              trigger={
                <Menu.Item
                  name="register"
                  active={activeItem === "register"}
                  style={menuItemStyle}
                  onClick={handleItemClick}
                  as={Link}
                  to={"/register"}
                />
              }
            />
            <InvertedPopup
              position="top center"
              content="Go to Repository!"
              trigger={
                <Menu.Item
                  icon="github"
                  size="big"
                  target="_blank"
                  style={menuItemStyle}
                  href="https://github.com/ofekatr/Yelp-Clone"
                />
              }
            />
          </Menu.Menu>
        </Menu>
      )}
      <Image
        centered
        size="small"
        src="https://s3-media0.fl.yelpcdn.com/assets/public/default.yji-a536dc4612adf182807e56e390709483.png"
        as={Link}
        onClick={() => setActiveItem("home")}
        to={"/"}
      />
    </>
  );
}

export default withRouter(Menubar);
