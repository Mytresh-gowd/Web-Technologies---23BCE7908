let xmlDoc = null;
const table = document.getElementById("employeeTable");
const message = document.getElementById("message");

// READ (Fetch XML)
function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;

            if (!xmlDoc) {
                showMessage("Malformed XML file!", "error");
                return;
            }

            displayEmployees();
        } else {
            showMessage("Error loading XML (404)", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network Error (500)", "error");
    };

    xhr.send();
}

// Display Employees
function displayEmployees() {
    table.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No employees found!", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {

        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td><button onclick="deleteEmployee('${id}')">Delete</button></td>
            </tr>
        `;

        table.innerHTML += row;
    }
}

// CREATE
function addEmployee() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            showMessage("Employee ID already exists!", "error");
            return;
        }
    }

    const newEmp = xmlDoc.createElement("employee");

    newEmp.appendChild(createNode("id", id));
    newEmp.appendChild(createNode("name", name));
    newEmp.appendChild(createNode("department", dept));
    newEmp.appendChild(createNode("salary", salary));

    xmlDoc.documentElement.appendChild(newEmp);

    displayEmployees();
    showMessage("Employee Added Successfully!", "success");
}

// UPDATE
function updateEmployee() {
    const id = document.getElementById("id").value;
    const dept = document.getElementById("department").value;
    const salary = document.getElementById("salary").value;

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            emp.getElementsByTagName("department")[0].textContent = dept;
            emp.getElementsByTagName("salary")[0].textContent = salary;

            displayEmployees();
            showMessage("Employee Updated Successfully!", "success");
            return;
        }
    }

    showMessage("Employee Not Found (404)", "error");
}

// DELETE
function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");

    for (let emp of employees) {
        if (emp.getElementsByTagName("id")[0].textContent === id) {
            emp.parentNode.removeChild(emp);
            displayEmployees();
            showMessage("Employee Deleted Successfully!", "success");
            return;
        }
    }

    showMessage("Employee Not Found!", "error");
}

// Helper to create XML node
function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.appendChild(xmlDoc.createTextNode(value));
    return node;
}

// Message display
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Initial Load
loadEmployees();
