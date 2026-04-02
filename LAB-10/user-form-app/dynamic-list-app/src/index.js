import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 1. Find the root element from your index.html
const rootElement = document.getElementById("root");

// 2. Create a React root using the modern React 18 API
const root = ReactDOM.createRoot(rootElement);

// 3. Render your main App component inside that root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);