import React from "react";
import { Container } from "semantic-ui-react";
import "./App.css";
import Router from "./components/Router";
import { RestaurantContextProvider } from "./context";

function App() {
  return (
    <div>
      <RestaurantContextProvider>
        <Container>
          <Router />
        </Container>
      </RestaurantContextProvider>
    </div>
  );
}

export default App;
