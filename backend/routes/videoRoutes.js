const express = require("express");
const { getVideo } = require("../controllers/videoController");

const router = express.Router();

// POST /api/videos
router.post("/", getVideo);

module.exports = router;