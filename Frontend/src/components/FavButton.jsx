/*
  🚧 Features to implement later:
  - Check if the house is already in favourites (from Redux or API)
  - On click: toggle favourite state (update Redux + DB)
  - Show filled ❤️ if favourite, else outline 🤍
  - Disable click if user is not logged in
*/

import { useState } from "react";

const FavButton = ({ isFavourite }) => {
  const [fav, setFav] = useState(isFavourite || false); // Temporary local state

  return (
    <button
      onClick={() => setFav(!fav)} // Remove this when using actual logic
      aria-label="Toggle favourite"
      className="text-2xl transition-colors duration-200 hover:text-red-500"
    >
      {fav ? "❤️" : "🤍"}
    </button>
  );
};

export default FavButton;
