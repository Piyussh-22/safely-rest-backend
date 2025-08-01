// 🧠 FUNCTIONALITY TO BE ADDED LATER:
// - Check if the house is already in favourites
// - On click: toggle favourite state (add/remove from Redux or DB)
// - Show filled ❤️ if favourite, else outline 🤍
// - Optional: disable click if not logged in

import { useState } from "react";

const FavButton = ({ isFavourite }) => {
  // Local state just for UI toggle simulation (remove later)
  const [fav, setFav] = useState(isFavourite || false);

  return (
    <button
      onClick={() => setFav(!fav)} // Remove this when using actual state logic
      className="text-xl transition-colors duration-200 hover:text-red-500 flex-1"
    >
      {fav ? "❤️" : "🤍"}
    </button>
  );
};

export default FavButton;
