import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from './Student';
import Update from "./Update";
import Create from "./Create";
import Login from "./Login";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/index" element={<Student />}></Route>
          <Route path="index/update/:id" element={<Update />}></Route>
          <Route path="/create" element={<Create />}></Route>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
