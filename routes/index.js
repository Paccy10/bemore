const express = require("express");
const Page = require("../models/Page");
const Post = require("../models/Post");
const Contact = require("../models/Contact");
const sendEmail = require('../utils/sendEmail')

const router = express.Router();

router.get("/", (req, res) => {
  Page.findOne({ name: "home" })
    .then(page => {
      Post.find().then(posts => {
        res.render("index", {
          layout: "layouts/layout",
          page_name: "home",
          title: page.title,
          description: page.description,
          noIndex: page.noIndex,
          posts
        });
      }).catch(error => console.log(error));
    })
    .catch(err => console.log(err));
});

router.get("/contact-us", (req, res) => {
  Page.findOne({ name: "contact" })
    .then(page => {
      res.render("contact", {
        layout: "layouts/layout",
        page_name: "contact-us",
        title: page.title,
        description: page.description,
        noIndex: page.noIndex
      });
    })
    .catch(err => console.log(err));
});

router.post("/contact-us", (req, res) => {
  Page.findOne({ name: "contact" })
    .then(page => {
      Contact.find().then(async contacts => {
        const {name, email, message} = req.body
        var errors = []
        if(!name || !email || !message){
          errors.push({ msg: "Please fill all fields" });
        }
        if(errors.length > 0){
          res.render("contact", {
            layout: "layouts/layout",
            page_name: "contact-us",
            title: page.title,
            description: page.description,
            noIndex: page.noIndex,
            errors
          });
        }
        const mailOptions = {
          to: contacts[0].email,
          from: `${name} <${email}>`,
          subject: 'Help',
          text: message
        };
        await sendEmail(mailOptions)
        req.flash("success_msg", "Email successfully sent")
        res.render("contact", {
          layout: "layouts/layout",
          page_name: "contact-us",
          title: page.title,
          description: page.description,
          noIndex: page.noIndex
        });
      }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
