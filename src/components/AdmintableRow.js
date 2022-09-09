import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdmintableRow({ first_name, last_name, email, user_id, index }) {
  const navigate = useNavigate();
  return (
    <>
      <td>{index}</td>
      <td className="text-capitalize">{first_name}</td>
      <td className="text-capitalize">{last_name}</td>
      <td>{email}</td>
      <td>
        <Button
          variant="primary"
          size="sm"
          className="rounded-0 fw-bold"
          onClick={() => navigate(`/${user_id}`)}
        >
          View Tasks
        </Button>
      </td>
    </>
  );
}

export default AdmintableRow;
