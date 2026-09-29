const getVideo = (req, res) => {
    const { url } = req.body;

    // Check if URL was provided
    if (!url) {
        return res.status(400).json({
            message: "YouTube URL is required"
        });
    }

    // Extract YouTube video ID
    const videoId = extractYouTubeVideoId(url);

    // Check if it is a valid YouTube URL
    if (!videoId) {
        return res.status(400).json({
            message: "Invalid YouTube URL"
        });
    }

    // Send video ID back to frontend
    res.json({
        videoId: videoId
    });
};


// Function to extract YouTube video ID
const extractYouTubeVideoId = (url) => {
    try {
        const parsedUrl = new URL(url);

        // Normal YouTube URL:
        // https://www.youtube.com/watch?v=VIDEO_ID
        if (
            parsedUrl.hostname === "www.youtube.com" ||
            parsedUrl.hostname === "youtube.com"
        ) {
            return parsedUrl.searchParams.get("v");
        }

        // Short YouTube URL:
        // https://youtu.be/VIDEO_ID
        if (parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.substring(1);
        }

        return null;

    } catch (error) {
        return null;
    }
};


module.exports = {
    getVideo
};