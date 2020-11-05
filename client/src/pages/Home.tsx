import React, { useContext, useEffect, useState } from "react";
import { Button, Divider } from "semantic-ui-react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantsGrid from "../components/RestaurantsGrid";
import { AuthContext } from "../context/auth";
import { useRedirectToLogin } from "../utils/hooks";

export default function Home(props) {
  const { user } = useContext(AuthContext);
  const [displayAdd, setDisplayAdd] = useState(false);

  useEffect(() => {
    setDisplayAdd(displayAdd && !!user);
  }, [user]);

  const { onClick } = useRedirectToLogin(
    () => setDisplayAdd(true),
    user,
    props
  );

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
          onClick={onClick}
        />
      )}
      <Divider hidden />
      <RestaurantsGrid style={{}} />
    </div>
  );
}
