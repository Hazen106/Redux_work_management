import React from "react";
import WorkerList from "./components/WorkerList";
//import WorkerForm from "./components/WorkerForm"
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <WorkerList />
    </div>
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<WorkerList/>} />
    //       <Route path="/add" element={<WorkerForm/>} />
    //       <Route path="/edit/:id" element={<WorkerForm/>} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;