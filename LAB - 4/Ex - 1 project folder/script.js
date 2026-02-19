const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");

let isUsernameAvailable = false;

// Event listener when user types
usernameInput.addEventListener("input", function () {

    const username = usernameInput.value.trim();

    if (username.length === 0) {
        feedback.textContent = "";
        return;
    }

    // Show loading indicator
    feedback.textContent = "Checking...";
    feedback.className = "loading";

    // AJAX request using Fetch API
    fetch("users.json")
        .then(response => response.json())
        .then(data => {

            // Simulate server delay (optional)
            setTimeout(() => {

                if (data.usernames.includes(username)) {
                    feedback.textContent = "Username already taken";
                    feedback.className = "taken";
                    isUsernameAvailable = false;
                } else {
                    feedback.textContent = "Username available";
                    feedback.className = "available";
                    isUsernameAvailable = true;
                }

            }, 800); // 800ms delay

        })
        .catch(error => {
            feedback.textContent = "Error checking username";
            feedback.className = "taken";
            isUsernameAvailable = false;
        });
});

// Prevent form submission if username not available
form.addEventListener("submit", function (event) {
    if (!isUsernameAvailable) {
        event.preventDefault();
        alert("Please choose a different username.");
    }
});
