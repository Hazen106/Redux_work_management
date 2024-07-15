import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkForm from "./components/WorkForm";
import WorkList from "./components/WorkList";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Quản lý công việc</h1>
        <Routes>
          <Route path="/" element={<WorkList/>} />
          <Route path="/add" element={<WorkForm/>} />
          <Route path="/edit/:id" element={<WorkForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;