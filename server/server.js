// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const Grid = require("gridfs-stream");
// const stream = require('stream');
const crypto = require("crypto");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(
  'mongodb+srv://suraj2023:12345@cluster0.awkkupy.mongodb.net/timecapsuleapp?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let gfs; // Declare gfs as a global variable
// When the connection is successful
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");

  // Create a GridFS stream connection
  const conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;

  // Check if the 'db' variable is defined before creating the Grid object
  if (!conn.db) {
    throw new Error("MongoDB connection is not available.");
  }
  gfs = Grid(conn.db);
});

// When an error occurs during connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Define MongoDB User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Define MongoDB Capsule Data Schema and Model
const capsuleDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,
  file: mongoose.Schema.Types.ObjectId, // Store the GridFS file ID
  dateTime: Date,
});

const CapsuleData = mongoose.model("CapsuleData", capsuleDataSchema);

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Registration
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user._id }, "secret-key");

    // Send user's name along with the token
    res.status(200).json({ token, name: user.name });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// New route to fetch user's name
app.get("/api/getUserName", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the headers
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ name: user.name });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Submit Form Data with File Upload
app.post("/submitData", upload.single("file"), async (req, res) => {
  try {
    const { email, dateTime } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    // Generate a unique filename
    const filename = crypto.randomBytes(16).toString("hex") + path.extname(req.file.originalname);

        // Log the content type to verify it's correctly captured
    console.log("Content Type:", req.file.mimetype);

    // Create a writable stream to store the file in GridFS
    const writeStream = gfs.createWriteStream({
      filename,
      mode: "w",
      content_type: req.file.mimetype,
    });

    // Pipe the uploaded file data to the GridFS stream
    writeStream.write(req.file.buffer);

    // Get the user's ID from the JWT
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the headers
    const decoded = jwt.verify(token, "secret-key");
    const userId = decoded.userId;

    // Save the CapsuleData with the file's GridFS ID
    const capsuleData = new CapsuleData({
      user: userId,
      email: email,
      file: writeStream.id, // Store the GridFS file ID
      dateTime: new Date(dateTime),
    });

    // Save the data to the database
    await capsuleData.save();

    res.status(201).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ error: "Data submission failed" });
  }
});

// Add this route to fetch user-specific data based on the token
app.get("/api/getUserData", async (req, res) => {
  try {
    // Extract the token from the headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token and decode the user ID
    const decoded = jwt.verify(token, "secret-key");

    // Find the user's data based on the decoded user ID
    const userData = await CapsuleData.find({ user: decoded.userId });

    if (!userData) {
      throw new Error("User data not found");
    }

    // Send the user's data as a response
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});


// Add a route for viewing files
app.get("/viewFile/:fileId", (req, res) => {
  try {
    const fileId = req.params.fileId;
    const token = req.query.token;

    if (!fileId) {
      return res.status(400).json({ error: "Invalid file ID" });
    }

    if (!token) {
      console.error("No authorization token found.");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Query the fs.files collection to get the file's metadata
    gfs.files.findOne({ _id: fileId }, (err, file) => {
      if (err) {
        console.error("Error finding file metadata:", err);
        return res.status(500).json({ error: "Error finding file metadata" });
      }

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      // Set the content type from the file metadata
      res.contentType(file.contentType);

      const readStream = gfs.createReadStream({ _id: fileId });

      // Handle any errors that may occur during the stream piping
      readStream.on('error', (error) => {
        console.error("Error streaming file:", error);
        res.status(500).json({ error: "Error streaming file" });
      });

      // Pipe the file stream to the response object to send the file to the client
      readStream.pipe(res);
    });
  } catch (error) {
    console.error("Error viewing file:", error);
    res.status(500).json({ error: "Error viewing file" });
  }
});






// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
