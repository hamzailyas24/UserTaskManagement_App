import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Todo from "../pages/Todo";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userapp" element={<Todo />} />

      </Routes>
    </>
  );
}

export default AppRouter;