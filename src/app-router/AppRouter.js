import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Todo from "../pages/Todo";
import UserTasks from "../pages/UserTasks";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userapp" element={<ProtectedRoutes Component={Todo} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={<AdminProtectedRoutes Cmp={Dashboard} />}
        />
        <Route
          path="/:userID"
          element={<AdminProtectedRoutes Cmp={UserTasks} />}
        />
      </Routes>
    </>
  );
}

export default AppRouter;
