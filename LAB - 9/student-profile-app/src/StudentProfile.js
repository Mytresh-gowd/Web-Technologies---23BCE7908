import React from "react";

function StudentProfile() {
  // Student details
  const name = "Mytresh Sirige";
  const department = "Computer Science";
  const year = "3rd Year";
  const section = "A";

  // Internal CSS (JS object style)
  const containerStyle = {
    border: "2px solid black",
    padding: "20px",
    width: "320px",
    margin: "20px auto",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    fontFamily: "Arial"
  };

  const headingStyle = {
    textAlign: "center",
    color: "darkgreen"
  };

  const textStyle = {
    fontSize: "16px",
    margin: "8px 0"
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Student Details</h2>

      <p style={textStyle}>
        <strong>Name:</strong> {name}
      </p>

      <p style={textStyle}>
        <strong>Department:</strong> {department}
      </p>

      <p style={textStyle}>
        <strong>Year:</strong> {year}
      </p>

      <p style={textStyle}>
        <strong>Section:</strong> {section}
      </p>
    </div>
  );
}

export default StudentProfile;