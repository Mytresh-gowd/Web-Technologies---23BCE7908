const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusDiv = document.getElementById("status");

let debounceTimer;

// Debounce function
function debounce(callback, delay) {
    return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(callback, delay);
    };
}

// Event Listener with Debouncing
searchInput.addEventListener("input", debounce(function () {

    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        resultsDiv.innerHTML = "";
        statusDiv.innerHTML = "";
        return;
    }

    statusDiv.innerHTML = "Searching...";
    statusDiv.className = "loading";

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {

            setTimeout(() => {  // Simulated server delay

                const filteredProducts = data.products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );

                displayResults(filteredProducts);

            }, 500);

        })
        .catch(error => {
            statusDiv.innerHTML = "Error fetching data!";
            statusDiv.className = "error";
        });

}, 500));


// Function to display products
function displayResults(products) {

    resultsDiv.innerHTML = "";

    if (products.length === 0) {
        statusDiv.innerHTML = "No results found";
        statusDiv.className = "error";
        return;
    }

    statusDiv.innerHTML = "Results:";
    statusDiv.className = "";

    products.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p class="price">₹ ${product.price}</p>
        `;

        resultsDiv.appendChild(card);
    });
}
