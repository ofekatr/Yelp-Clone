import React, { useState, createContext } from "react";

export const RestaurantContext = createContext({});

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([] as any);

  return (
    <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
      {props.children}
    </RestaurantContext.Provider>
  );
};
