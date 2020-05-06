const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) =>
  res.render("login", {
    layout: "layouts/layout",
    page_name: "login",
  })
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
});

module.exports = router;
