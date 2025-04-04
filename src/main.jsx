import React from "react"; // Add this
import { createRoot } from "react-dom/client"; // Changed from import statement
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode> {/* Use React.StrictMode */}
    <App />
  </React.StrictMode>
);