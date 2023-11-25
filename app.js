//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const dotenv =require("dotenv")

dotenv.config();

let posts = [];
const homeStartingContent =
  "Daily Journal is simple and cool website where one can write his/her daily doings.Like how their day went, and other stuffs they have done in their day."

 const aboutContent =
 { 
    "me":"Passionate Web Developer and Coding Enhusiast",
    "github":"GitHub :" ,
    "gitlink":" https://github.com/khanfauzan1",
    "linkedin":"LinkedIn : ",
    "link":"https://www.linkedin.com/in/fauzan-ahmad-211369235/"
 }
const contactContent =
  {
   "mobile_no":"+91 8299898504",
   "email":"fauzankhan339@gmail.com"

  }
const app = express();

app.set("view engine", "ejs"); //we can use "home" instead of "home.ejs"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("compose.ejs");
});

app.get("/home", (req, res) => {
  res.render("home.ejs", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    about: aboutContent,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contact: contactContent,
  });
});


app.post("/compose", (req, res) => {
  // res.render("compose.ejs");
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/home");
});
app.get("/posts/:route", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.route);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post.ejs", {
        title: post.title,
        content: post.content,
      });
    }
    // console.log(data.title);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
