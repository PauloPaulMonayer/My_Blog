const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// מערך לשמירת הפוסטים
let posts = []; // כאן מגדירים את המערך

// דף הבית שמציג את כל הפוסטים
app.get("/", (req, res) => {
  res.render("home", { posts: posts }); // כאן משתמשים במערך המוגדר
});

// יצירת פוסט חדש
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/");
});

// עריכת פוסט
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  res.render("edit", { post: post });
});

app.post("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

// מחיקת פוסט
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect("/");
});

// הפעלת השרת
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
