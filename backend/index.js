const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./db");
var cors = require("cors");

const userRoutes = require("./routes/user"); // Import user.js routes
const accountRoutes = require("./routes/account");

app.use(cors());
app.use(express.json());

// Use the userRoutes for /api/v1/user
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    console.log("Started Server");
    const dbClient = await dbConnect();
    console.log(`Server Listening on Port ${PORT}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
