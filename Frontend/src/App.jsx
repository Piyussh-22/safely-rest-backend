import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HouseList from "./pages/HouseList";
import HouseDetails from "./pages/HouseDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house-list" element={<HouseList />} />
        <Route path="/house/:id" element={<HouseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
