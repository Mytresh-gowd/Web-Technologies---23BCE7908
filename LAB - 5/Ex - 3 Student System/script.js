let students = [];
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

// FETCH JSON DATA
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON (404)");
            }
            return response.json(); // JSON Parsing
        })
        .then(data => {
            students = data.students;
            displayStudents();
        })
        .catch(error => {
            showMessage("JSON Parsing or Network Error!", "error");
            console.error(error);
        });
}

// DISPLAY STUDENTS
function displayStudents() {
    table.innerHTML = "";

    if (students.length === 0) {
        showMessage("No students found!", "error");
        return;
    }

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// VALIDATION
function validateFields(id, name, course, marks) {
    if (!id || !name || !course || !marks) {
        showMessage("All fields are required!", "error");
        return false;
    }

    if (marks < 0 || marks > 100) {
        showMessage("Marks must be between 0 and 100!", "error");
        return false;
    }

    return true;
}

// CREATE
function addStudent() {
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (!validateFields(id, name, course, marks)) return;

    if (students.some(student => student.id === id)) {
        showMessage("Student ID already exists!", "error");
        return;
    }

    const newStudent = { id, name, course, marks };

    students.push(newStudent);
    displayStudents();
    showMessage("Student Added Successfully!", "success");
}

// UPDATE
function updateStudent() {
    const id = document.getElementById("id").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    for (let student of students) {
        if (student.id === id) {
            student.course = course;
            student.marks = marks;
            displayStudents();
            showMessage("Student Updated Successfully!", "success");
            return;
        }
    }

    showMessage("Student Not Found (404)", "error");
}

// DELETE
function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        showMessage("Student Not Found!", "error");
        return;
    }

    students.splice(index, 1);
    displayStudents();
    showMessage("Student Deleted Successfully!", "success");
}

// MESSAGE FUNCTION
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// INITIAL LOAD
loadStudents();
