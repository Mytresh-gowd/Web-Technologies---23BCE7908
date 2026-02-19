const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");

let students = [];

// READ - Fetch Students
function fetchStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) throw new Error("404 Not Found");
            return response.json();
        })
        .then(data => {
            students = data.students;
            displayStudents();
        })
        .catch(error => {
            showMessage("Error fetching students (404)", "error");
        });
}

// Display students in table
function displayStudents() {
    table.innerHTML = "";

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Edit</button>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// CREATE - Add Student
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    if (students.find(s => s.id === id)) {
        showMessage("Student ID already exists (500 Error)", "error");
        return;
    }

    const newStudent = { id, name, department, marks };

    students.push(newStudent);

    displayStudents();
    showMessage("Student Added Successfully (200 OK)", "success");
    form.reset();
});

// UPDATE - Edit Student
function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student not found (404)", "error");
        return;
    }

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;

    deleteStudent(id); // Remove old record before updating
}

// DELETE - Remove Student
function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student not found (404)", "error");
        return;
    }

    students.splice(index, 1);
    displayStudents();
    showMessage("Student Deleted Successfully (200 OK)", "success");
}

// Show messages
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
}

// Initial Load
fetchStudents();
