import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = localStorage.getItem("userID");
    if (!userLogin) {
      navigate("/");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}

export default ProtectedRoutes;
