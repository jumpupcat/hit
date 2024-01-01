import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import GodhChart from "./Components/GodhChart";

export default function App() {
  return (
    <div className="App">
      <Header />
      
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<GodhChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
