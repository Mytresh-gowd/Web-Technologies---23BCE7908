let products = [];
const table = document.getElementById("inventoryTable");
const message = document.getElementById("message");
const totalValueSpan = document.getElementById("totalValue");

// LOAD JSON
function loadInventory() {
    fetch("inventory.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON");
            return response.json();
        })
        .then(data => {
            products = data.products;
            displayProducts(products);
        })
        .catch(error => {
            showMessage("JSON Load Error!", "error");
            console.error(error);
        });
}

// DISPLAY PRODUCTS
function displayProducts(productList) {
    table.innerHTML = "";
    let totalValue = 0;

    productList.forEach(product => {

        const value = product.price * product.stock;
        totalValue += value;

        const row = document.createElement("tr");

        if (product.stock < 5) {
            row.classList.add("low-stock");  // Conditional formatting
        }

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.stock}</td>
            <td>₹${value}</td>
            <td>
                <button onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });

    totalValueSpan.textContent = totalValue;
}

// VALIDATION
function validateFields(id, name, category, price, stock) {
    if (!id || !name || !category || !price || !stock) {
        showMessage("All fields are required!", "error");
        return false;
    }

    if (price <= 0 || stock < 0) {
        showMessage("Invalid price or stock!", "error");
        return false;
    }

    return true;
}

// ADD PRODUCT
function addProduct() {
    const id = id.value.trim();
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!validateFields(id, name, category, price, stock)) return;

    if (products.some(p => p.id === id)) {
        showMessage("Product ID already exists!", "error");
        return;
    }

    products.push({ id, name, category, price, stock });
    displayProducts(products);
    showMessage("Product Added Successfully!", "success");
}

// UPDATE PRODUCT
function updateProduct() {
    const idVal = document.getElementById("id").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    for (let product of products) {
        if (product.id === idVal) {
            product.price = price;
            product.stock = stock;
            displayProducts(products);
            showMessage("Product Updated Successfully!", "success");
            return;
        }
    }

    showMessage("Product Not Found!", "error");
}

// DELETE PRODUCT
function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        showMessage("Product Not Found!", "error");
        return;
    }

    products.splice(index, 1);
    displayProducts(products);
    showMessage("Product Deleted Successfully!", "success");
}

// SEARCH BY CATEGORY
function searchByCategory() {
    const category = document.getElementById("searchCategory").value.trim().toLowerCase();

    const filtered = products.filter(p =>
        p.category.toLowerCase().includes(category)
    );

    displayProducts(filtered);

    if (filtered.length === 0) {
        showMessage("No products found!", "error");
    } else {
        showMessage("Search Results Displayed!", "success");
    }
}

// MESSAGE FUNCTION
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// INITIAL LOAD
loadInventory();
