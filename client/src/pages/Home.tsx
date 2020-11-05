import React, { useContext, useEffect, useState } from "react";
import { Button, Divider } from "semantic-ui-react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantsGrid from "../components/RestaurantsGrid";
import { AuthContext } from "../context/auth";

export default function Home(props) {
  const { user } = useContext(AuthContext);
  const [displayAdd, setDisplayAdd] = useState(false);

  useEffect(() => {
    setDisplayAdd(displayAdd && !!user);
  }, [user]);

  return (
    <div>
      {displayAdd ? (
        <AddRestaurant style={{}} />
      ) : (
        <Button
          color="purple"
          size="large"
          circular
          icon="plus"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: "30px",
          }}
          content="Add A Restaurant"
          onClick={
            user
              ? () => setDisplayAdd(true)
              : () => props.history.push("/login")
          }
        />
      )}
      <Divider hidden />
      <RestaurantsGrid style={{}} />
    </div>
  );
}
