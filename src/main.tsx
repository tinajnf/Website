// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsGrid from "./ProjectsGrid";
import ProjectRouter from "./ProjectRouter";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsGrid />} />
        <Route path="/projects/:slug" element={<ProjectRouter />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
