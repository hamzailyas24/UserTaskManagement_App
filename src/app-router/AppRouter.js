import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Todo from "../pages/Todo";
import UserTasks from "../pages/UserTasks";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userapp" element={<Todo />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:userID" element={<UserTasks />} />
      </Routes>
    </>
  );
}

export default AppRouter;