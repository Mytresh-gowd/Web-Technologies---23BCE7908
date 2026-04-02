import React from "react";

function StudentCard(props) {
  // Internal CSS
  const cardStyle = {
    border: "2px solid #333",
    borderRadius: "10px",
    padding: "15px",
    width: "220px",
    backgroundColor: "#f4f4f4",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    fontFamily: "Arial"
  };

  const textStyle = {
    margin: "8px 0",
    fontSize: "15px"
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ color: "darkgreen", textAlign: "center" }}>
        Student Card
      </h3>

      <p style={textStyle}>
        <strong>Name:</strong> {props.name}
      </p>

      <p style={textStyle}>
        <strong>Department:</strong> {props.department}
      </p>

      <p style={textStyle}>
        <strong>Marks:</strong> {props.marks}
      </p>
    </div>
  );
}

export default StudentCard;