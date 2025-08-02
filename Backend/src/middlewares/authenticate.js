import { ROLES } from "../constants/roles.js";

export const authenticate = (roles = []) => {
  return (req, res, next) => {
    // Check if user is logged in
    if (!req.session || !req.session.isLoggedIn) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // If no roles specified, allow all logged-in users
    if (roles.length === 0) {
      return next();
    }

    // Check user's role
    const userRole = req.session.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden. You do not have access." });
    }

    next();
  };
};
