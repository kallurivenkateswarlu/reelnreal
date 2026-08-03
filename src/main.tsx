import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Reel N Real</h1>;
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
