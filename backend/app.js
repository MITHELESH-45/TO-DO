const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const todoListRoutes = require("./routes/todoListRoutes");
const todoItemRoutes = require("./routes/todoItemRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/lists", todoListRoutes);
app.use("/api/items", todoItemRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;