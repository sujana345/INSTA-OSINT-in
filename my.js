// install: npm install express bcrypt body-parser

const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// fake database
let users = [];

// register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (password.length < 8) {
    return res.send("Password too weak");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username,
    password: hashedPassword
  });

  res.send("User registered securely");
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    res.send("Login success ✅");
  } else {
    res.send("Invalid password ❌");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));