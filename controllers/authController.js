// GET: Login Page
export const getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "LogIn",
    errorMessage: null,
    isLoggedIn: req.session.isLoggedIn || false, // Safe fallback
  });
};

// POST: Handle Login
export const postLogin = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email, password);

  // Simulate login success
  req.session.isLoggedIn = true;

  // Optional: Wait until session is saved before redirecting
  req.session.save(() => {
    res.redirect("/");
  });
};

// POST: Logout
export const postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

export const isAuth = (req, res, next) => {
  if (req.isLoggedIn) {
    return next();
  }
  res.redirect("/login");
};
