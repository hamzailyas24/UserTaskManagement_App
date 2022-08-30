import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleLogout = () => {
    setLoader(true);
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_name");
    setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 100);
    setLoader(false);
  };

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Dashboard</h1>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );
}

export default Dashboard;
