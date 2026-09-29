const youtubeUrlInput = document.getElementById("youtubeUrl");
const watchButton = document.getElementById("watchButton");
const videoContainer = document.getElementById("videoContainer");
const errorMessage = document.getElementById("errorMessage");


watchButton.addEventListener("click", async () => {

    const url = youtubeUrlInput.value.trim();

    // Clear previous results
    errorMessage.textContent = "";
    videoContainer.innerHTML = "";

    // Check if user entered something
    if (!url) {
        errorMessage.textContent = "Please enter a YouTube URL.";
        return;
    }

    try {

        // Send URL to backend
        const response = await fetch("http://localhost:5000/api/videos", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url
            })
        });

        const data = await response.json();

        // Backend returned an error
        if (!response.ok) {
            errorMessage.textContent = data.message;
            return;
        }

        // Get video ID from backend
        const videoId = data.videoId;

        // Create YouTube player
        videoContainer.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoId}?rel=0"
                allowfullscreen>
            </iframe>
        `;

    } catch (error) {

        errorMessage.textContent =
            "Unable to connect to the server.";

        console.error(error);
    }
});