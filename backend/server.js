const express = require("express");
const path = require("path");

const videoRoutes = require("./routes/videoRoutes");

const app = express();

const PORT = 5000;


// Middleware
app.use(express.json());


// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));


// API routes
app.use("/api/videos", videoRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});