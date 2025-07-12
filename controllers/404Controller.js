export const get404 = (req, res) => {
  res.status(404).render("404page", {
    pageTitle: "page not found",
    currentPage: "404page",
    url: req.originalUrl,
  });
};
