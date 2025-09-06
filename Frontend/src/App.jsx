import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/store/Index";
import HouseList from "./pages/store/HouseList";
import HouseDetails from "./pages/store/HouseDetails";
import FavouriteList from "./pages/store/FavouriteList";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ErrorPage from "./pages/ErrorPage";
import HostHouseList from "./pages/host/HostHouseList";
import AddOrEditHouse from "./pages/host/AddOrEditHouse";

const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Navbar />
      <main className="flex-1 p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/houses" element={<HouseList />} />
        <Route path="/houses/:id" element={<HouseDetails />} />
        <Route
          path="/favourites"
          element={<FavouriteList favouriteHouses={dummyFavourites} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/host/houses" element={<HostHouseList />} />
        <Route path="/host/add-house" element={<AddOrEditHouse />} />
        <Route path="/host/edit-house/:id" element={<AddOrEditHouse />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
