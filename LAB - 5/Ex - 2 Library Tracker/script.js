let xmlDoc = null;
const table = document.getElementById("bookTable");
const message = document.getElementById("message");

// LOAD XML (AJAX GET)
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;

            if (!xmlDoc) {
                showMessage("Malformed XML!", "error");
                return;
            }

            displayBooks();
        } else {
            showMessage("Error loading XML (404)", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network Error (500)", "error");
    };

    xhr.send();
}

// DISPLAY BOOKS
function displayBooks() {
    table.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("No books found!", "error");
        return;
    }

    for (let book of books) {
        const id = book.getElementsByTagName("id")[0].textContent;
        const title = book.getElementsByTagName("title")[0].textContent;
        const author = book.getElementsByTagName("author")[0].textContent;
        const status = book.getElementsByTagName("status")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
                <td>
                    <button onclick="deleteBook('${id}')">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    }
}

// VALIDATION
function validateFields(id, title, author) {
    if (!id || !title || !author) {
        showMessage("All fields are required!", "error");
        return false;
    }
    return true;
}

// CREATE (Add Book)
function addBook() {
    const id = document.getElementById("id").value.trim();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const status = document.getElementById("status").value;

    if (!validateFields(id, title, author)) return;

    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists!", "error");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");
    newBook.appendChild(createNode("id", id));
    newBook.appendChild(createNode("title", title));
    newBook.appendChild(createNode("author", author));
    newBook.appendChild(createNode("status", status));

    xmlDoc.documentElement.appendChild(newBook);

    displayBooks();
    showMessage("Book Added Successfully!", "success");
}

// UPDATE STATUS
function updateBook() {
    const id = document.getElementById("id").value.trim();
    const newStatus = document.getElementById("status").value;

    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.getElementsByTagName("status")[0].textContent = newStatus;
            displayBooks();
            showMessage("Book Status Updated!", "success");
            return;
        }
    }

    showMessage("Book not found (404)", "error");
}

// DELETE
function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.parentNode.removeChild(book);
            displayBooks();
            showMessage("Book Deleted Successfully!", "success");
            return;
        }
    }

    showMessage("Book not found!", "error");
}

// HELPER NODE CREATION
function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.appendChild(xmlDoc.createTextNode(value));
    return node;
}

// MESSAGE DISPLAY
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// INITIAL LOAD
loadBooks();
