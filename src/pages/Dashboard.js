import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdmintableRow from "../components/AdmintableRow";
import LoadingSpinner from "../components/LoadingSpinner";

const getAllUsersURL =
  "https://usertaskmanagement.herokuapp.com/admin/getallusers";

function Dashboard() {
  const admin_id = localStorage.getItem("admin_id");
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);

  const usersHandle = async () => {
    try {
      setLoader(true);
      const response = await axios.post(getAllUsersURL, {
        admin_id: admin_id,
      });
      console.log(response.data.status);
      if (response.data.status === true) {
        setUsers(response.data.users);
        setLoader(false);
      } else {
        alert("ERROR in usersHanlde");
        setLoader(false);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("ERROR ===>", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (admin_id) {
      usersHandle();
    }
  }, []);

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <>
          <AdminHeader />
          <Container>
            <h3 className="text-center mt-3 bg-light text-dark p-2">
              All Users
            </h3>

            <Table responsive striped bordered hover size="sm" className="mt-2">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users.map((user, i) => {
                  return (
                    <tr key={user._id}>
                      <AdmintableRow
                        user_id={user._id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        index={i}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
}

export default Dashboard;
