document.getElementById("loginButton").addEventListener("click", function () {
    const backendURL = "http://BackendLB-url.com/login"; // Replace with actual ALB DNS
    const responseDiv = document.getElementById("response");

    // Show loading message with spinner
    responseDiv.classList.remove("hidden", "visible");
    responseDiv.innerHTML = `<span class="spinner"></span>Loading user info...`;

    fetch(backendURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.username && data.email) {
            responseDiv.innerHTML = `
                <strong>👤 User:</strong> ${data.username}<br>
                <strong>📧 Email:</strong> ${data.email}
            `;
        } else {
            responseDiv.innerText = "No user data found!";
        }
        responseDiv.classList.add("visible");
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        responseDiv.innerText = "⚠️ Failed to load data!";
        responseDiv.classList.add("visible");
    });
});
