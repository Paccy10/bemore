const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const Page = require("../models/Page");
const Post = require("../models/Post");
const Contact = require("../models/Contact");
const Tag = require("../models/Tag");

const router = express.Router();

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    layout: "layouts/dashboard",
    page_name: "dashboard",
  });
});

router.get("/pages", ensureAuthenticated, (req, res) => {
  Page.find()
    .then(pages => {
      res.render("pages", {
        layout: "layouts/dashboard",
        page_name: "pages",
        pages,
      });
    })
    .catch(err => console.log(err));
});

router.get("/pages/new", ensureAuthenticated, (req, res) => {
  res.render("newPage", {
    layout: "layouts/dashboard",
    page_name: "new page",
  });
});

router.post("/pages/new", ensureAuthenticated, (req, res) => {
  var { name, title, description, noIndex } = req.body;
  var errors = [];
  if (!name || !title || !description) {
    errors.push({ msg: "Please fill all fields" });
  }
  if (errors.length > 0) {
    res.render("newPage", {
      layout: "layouts/dashboard",
      page_name: "new page",
      errors,
      name,
      title,
      description,
      noIndex,
    });
  } else {
    if (noIndex == "on") noIndex = true;
    else noIndex = false;
    const newPage = new Page({ name, title, description, noIndex });
    newPage
      .save()
      .then(() => {
        req.flash("success_msg", "Page successfully created");
        res.redirect("/admin/pages");
      })
      .catch(err => console.log(err));
  }
});

router.get("/pages/:id/edit", ensureAuthenticated, (req, res) => {
  Page.findById(req.params.id)
    .then(page => {
      res.render("editPage", {
        layout: "layouts/dashboard",
        page_name: "edit page",
        id: page._id,
        name: page.name,
        title: page.title,
        description: page.description,
        noIndex: page.noIndex,
      });
    })
    .catch(err => console.log(err));
});

router.post("/pages/:id/edit", ensureAuthenticated, (req, res) => {
  Page.findById(req.params.id)
    .then(page => {
      var { name, title, description, noIndex } = req.body;
      var errors = [];
      if (!name || !title || !description) {
        errors.push({ msg: "Please fill all fields" });
      }
      if (errors.length > 0) {
        res.render("editPage", {
          layout: "layouts/dashboard",
          page_name: "edit page",
          errors,
          name,
          title,
          description,
          noIndex,
        });
      } else {
        if (noIndex == "on") noIndex = true;
        else noIndex = false;
        Page.updateOne(
          { _id: req.params.id },
          { name, title, description, noIndex }
        )
          .then(() => {
            req.flash("success_msg", "Page successfully updated");
            res.redirect("/admin/pages");
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.get("/posts", ensureAuthenticated, (req, res) => {
  Post.find()
    .then(posts => {
      res.render("posts", {
        layout: "layouts/dashboard",
        page_name: "posts",
        posts,
      });
    })
    .catch(err => console.log(err));
});

router.get("/posts/new", ensureAuthenticated, (req, res) => {
  res.render("newPost", {
    layout: "layouts/dashboard",
    page_name: "new post",
  });
});

router.post("/posts/new", ensureAuthenticated, (req, res) => {
  var { title, body } = req.body;
  var errors = [];
  if (!title || !body) {
    errors.push({ msg: "Please fill all fields" });
  }
  if (errors.length > 0) {
    res.render("newPost", {
      layout: "layouts/dashboard",
      page_name: "new post",
      errors,
      title,
    });
  } else {
    const newPost = new Post({ title, body });
    newPost
      .save()
      .then(() => {
        req.flash("success_msg", "Post successfully created");
        res.redirect("/admin/posts");
      })
      .catch(err => console.log(err));
  }
});

router.get("/posts/:id/edit", ensureAuthenticated, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render("editPost", {
        layout: "layouts/dashboard",
        page_name: "edit post",
        post,
      });
    })
    .catch(err => console.log(err));
});

router.post("/posts/:id/edit", ensureAuthenticated, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      var { title, body } = req.body;
      var errors = [];
      if (!title || !body) {
        errors.push({ msg: "Please fill all fields" });
      }
      if (errors.length > 0) {
        res.render("editPost", {
          layout: "layouts/dashboard",
          page_name: "edit post",
          errors,
          title,
        });
      } else {
        Post.updateOne({ _id: req.params.id }, { title, body })
          .then(() => {
            req.flash("success_msg", "Post successfully updated");
            res.redirect("/admin/posts");
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.get("/contacts", ensureAuthenticated, (req, res) => {
  Contact.find()
    .then(contacts => {
      res.render("contacts", {
        layout: "layouts/dashboard",
        page_name: "contacts",
        contacts,
      });
    })
    .catch(err => console.log(err));
});

router.get("/contacts/:id/edit", ensureAuthenticated, (req, res) => {
  Contact.findById(req.params.id)
    .then(contact => {
      console.log(contact._id);
      res.render("editContact", {
        layout: "layouts/dashboard",
        page_name: "edit contact",
        id: contact._id,
        email: contact.email,
      });
    })
    .catch(err => console.log(err));
});

router.post("/contacts/:id/edit", ensureAuthenticated, (req, res) => {
  Contact.findById(req.params.id)
    .then(contact => {
      var { email } = req.body;
      var errors = [];
      if (!email) {
        errors.push({ msg: "Please fill all fields" });
      }
      if (errors.length > 0) {
        res.render("editContact", {
          layout: "layouts/dashboard",
          page_name: "edit contact",
          errors,
          id: contact._id,
          email,
        });
      } else {
        Contact.updateOne({ _id: req.params.id }, { email })
          .then(() => {
            req.flash("success_msg", "Contact Email successfully updated");
            res.redirect("/admin/contacts");
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.get("/facebook-pixel/add", ensureAuthenticated, (req, res) => {
  res.render("addFacebookPixel", {
    layout: "layouts/dashboard",
    page_name: "add facebook pixel",
  });
});

router.post("/facebook-pixel/add", ensureAuthenticated, (req, res) => {
  Tag.findOne({ title: "facebook" })
    .then(tag => {
      var { head } = req.body;
      var errors = [];
      if (!head) {
        errors.push({ msg: "Please fill all fields" });
      }
      if (errors.length > 0) {
        res.render("addFacebookPixel", {
          layout: "layouts/dashboard",
          page_name: "add facebook pixel",
          errors,
          head,
        });
      } else {
        Tag.updateOne({ _id: tag._id }, { head })
          .then(() => {
            req.flash("success_msg", "Facebook Pixel successfully added");
            res.redirect("/admin/dashboard");
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

router.get("/google-analytics/add", ensureAuthenticated, (req, res) => {
  res.render("addGoogleAnalytics", {
    layout: "layouts/dashboard",
    page_name: "add google analytics",
  });
});

router.post("/google-analytics/add", ensureAuthenticated, (req, res) => {
  Tag.findOne({ title: "google" })
    .then(tag => {
      var { head, body } = req.body;
      var errors = [];
      if (!head || !body) {
        errors.push({ msg: "Please fill all fields" });
      }
      if (errors.length > 0) {
        res.render("addGoogleAnalytics", {
          layout: "layouts/dashboard",
          page_name: "add google analytics",
          errors,
          head,
          body,
        });
      } else {
        Tag.updateOne({ _id: tag._id }, { head, body })
          .then(() => {
            req.flash("success_msg", "Google Analytics Tag successfully added");
            res.redirect("/admin/dashboard");
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
