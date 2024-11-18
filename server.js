
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://nasirahmed:deeba%4012@cluster0.uoah2.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose;
mongoose;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model for the User
const User = mongoose.model("User", userSchema);

// Routes

// Route to add a new user
app.post("/add-user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User added successfully", user: { username } });
  } catch (error) {
    res.status(500).json({ error: "Error adding user" });
  }
});

// Route to fetch all usernames
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // Fetch usernames only
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
