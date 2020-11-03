import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Card, Container, Divider, Image } from "semantic-ui-react";

import CustomMenubar from "./components/CustomMenubar.tsx";
import "./App.css";
import { RestaurantContextProvider } from "./context";
import CustomSwitch from "./components/CustomSwitch";

function App() {
  return (
    <div className="bg">
      <RestaurantContextProvider>
        <Router>
          <Container>
            <Card id="content" fluid>
              <CustomMenubar />
              <Image
                centered
                size="small"
                src="https://s3-media0.fl.yelpcdn.com/assets/public/default.yji-a536dc4612adf182807e56e390709483.png"
                as={Link}
                to={"/"}
              />
              <Divider hidden />
              <CustomSwitch />
            </Card>
          </Container>
        </Router>
      </RestaurantContextProvider>
    </div>
  );
}

export default App;
