import React from "react";
import StudentCard from "./StudentCard";

function App() {
  // Student data (array of objects)
  const students = [
    { name: "Mytresh", department: "CSE", marks: 85 },
    { name: "Rahul", department: "ECE", marks: 78 },
    { name: "Sneha", department: "IT", marks: 92 },
    { name: "Anjali", department: "EEE", marks: 88 }
  ];

  // Container styling
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px"
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "darkblue" }}>
        Student Cards Application
      </h1>

      <div style={containerStyle}>
        {/* Reusable component rendering */}
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;