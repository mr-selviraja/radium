// nodemon -e js,pug,css app.js
// npm run watch:sass
const express = require("express");
const path = require("path");
const pug = require("pug");
const bodyParser = require("body-parser");
const reload = require("reload");

// starting contents of the webpage UI
const homeStartingContent = {
  title: "Welcome back, user. Have a Happy Reading!",
};

const writeStartingContent = {
  title: "Write everything you feel and want to..!",
  text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti quas officiis laboriosam fugit saepe in. Perspiciatis nisi est ratione inventore. Quaerat error tempore numquam vitae, deleniti atque. Delectus, aperiam suscipit? Aliquid velit quaerat accusantium quisquam.",
};

const aboutStartingContent = {
  title:
    "Radium is similar to the famous blogging site Medium, developed as a learning project for PUG/Templating engines.",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates suscipit pariatur, corporis recusandae, blanditiis inventore soluta dolorem autem neque in quos asperiores sapiente, vero atque ipsa nostrum. Aperiam, laboriosam cumque! Error cumque impedit doloremque esse corrupti quos ducimus animi quisquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, fugiat!",
};

// port number
const PORT = 3000;
// init app
const app = express();

// load pug-view-engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
// static files serving directory
app.use(express.static("public"));

const posts = [];

// GET: root route
app.get("/", (req, res) => {
  res.render("index", { content: homeStartingContent, posts: posts });
});

// GET: posts route
app.get("/posts/:postId", (req, res) => {
  const requestedTitle = req.params.postId;

  posts.forEach((post) => {
    const storedTitle = post.title;

    if (storedTitle.toLowerCase() === requestedTitle.toLowerCase()) {
      console.log("Match Found!");
    }
  });
});

// GET: write route
app.get("/write", (req, res) => {
  res.render("write", { content: writeStartingContent });
});

// POST: write route
app.post("/write", (req, res) => {
  const newPost = {
    title: req.body.postTitle,
    text: req.body.postDescription,
  };

  posts.push(newPost);

  res.redirect("/");
});

// GET: about route
app.get("/about", (req, res) => {
  res.render("about", { content: aboutStartingContent });
});

// GET: logout route
app.get("/logout", (req, res) => {
  res.render("logout");
});

reload(app);
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
