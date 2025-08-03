import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/store/Index";
import HouseList from "./pages/store/HouseList";
import HouseDetails from "./pages/store/HouseDetails";
import FavouriteList from "./pages/store/FavouriteList";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ErrorPage from "./pages/ErrorPage";
import HostHouseList from "./pages/host/HostHouseList";
import AddOrEditHouse from "./pages/host/AddOrEditHouse";
import Footer from "./components/Footer";
// ✅ Later: HostDashboard will be added

const App = () => {
  const dummyFavourites = [
    {
      _id: "1",
      name: "Sunny Stay",
      location: "Ranchi",
      price: 2500,
      rating: 4.5,
      photoUrl: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <>
      <Navbar />
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/houses" element={<HouseList />} />
        <Route path="/houses/:id" element={<HouseDetails />} />
        <Route
          path="/favourites"
          element={<FavouriteList favouriteHouses={dummyFavourites} />}
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Host Routes */}
        <Route path="/host/houses" element={<HostHouseList />} />
        <Route path="/host/add-house" element={<AddOrEditHouse />} />
        <Route path="/host/edit-house/:id" element={<AddOrEditHouse />} />

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
