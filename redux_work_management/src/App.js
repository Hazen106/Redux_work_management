import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkerForm from "./components/WorkerForm"
import WorkerList from "./components/WorkerList";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Quản lý nhân viên</h1>
        <Routes>
          <Route path="/" element={<WorkerList/>} />
          <Route path="/add" element={<WorkerForm/>} />
          <Route path="/edit/:id" element={<WorkerForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;