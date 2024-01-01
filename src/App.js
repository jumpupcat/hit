import React, { Component } from "react";
import Header from "./Components/Header";
import GodhChart from "./Components/GodhChart";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <GodhChart />
      </div>
    );
  }
}

export default App;
