import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImageUploadForm from "./components/ImageUploadForm";
import ViewImages from "./components/DisplayImages";

function App() {
  return (
    <Router>
      <div>
        <h1>Property Image Manager</h1>
        <nav>
          <Link to="/">Upload Images</Link> | <Link to="/view-images">View Images</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ImageUploadForm />} />
          <Route path="/view-images" element={<ViewImages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
