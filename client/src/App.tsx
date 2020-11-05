import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Card, Container, Divider } from "semantic-ui-react";

import CustomMenubar from "./components/CustomMenubar.tsx";
import "./App.css";
import CustomSwitch from "./components/CustomSwitch";

function App() {
  return (
    <div className="bg" style={{ maxHeight: "100vh", overflow: "auto" }}>
      <Router>
        <Container>
          <Card id="content" fluid>
            <CustomMenubar />
            <Divider hidden />
            <CustomSwitch />
          </Card>
        </Container>
      </Router>
    </div>
  );
}

export default App;
