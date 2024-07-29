import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import DeleteTask from "./pages/DeleteTask";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/tasks/delete/:id" element={<DeleteTask />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
};

export default App;