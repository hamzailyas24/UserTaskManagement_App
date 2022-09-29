import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtectedRoutes(props) {
  const { Cmp } = props;
  const adminLogin = localStorage.getItem("admin_id");
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminLogin) {
      navigate("/admin");
    }
  });

  return (
    <>
      <Cmp />
    </>
  );
}

export default AdminProtectedRoutes;