import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import GodhChart from "./Components/GodhChart";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<GodhChart />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
