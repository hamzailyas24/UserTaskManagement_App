import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table, Form, Alert } from "react-bootstrap";
import AdminHeader from "../components/AdminHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const remarksOptions = [
  {
    id: 1,
    label: "Excellent",
    value: "excellent",
  },
  {
    id: 2,
    label: "Good",
    value: "good",
  },
  {
    id: 3,
    label: "Bad",
    value: "bad",
  },
];

function UserTasks() {
  const { userID } = useParams();
  const [loader, setLoader] = useState(false);
  const [userTasks, setUsertasks] = useState([]);
  const [remarks, setRemarks] = useState("");

  const viewTaskhandler = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        "https://usertaskmanagement.herokuapp.com/getalltasks",
        {
          user_id: userID,
        }
      );
      if (response.data.status === true) {
        setUsertasks(response.data.tasks);
        setLoader(false);
        console.log(response.data.tasks);
      } else {
        alert("Something went wrong in view task handler");
        setLoader(false);
      }
    } catch (error) {
      console.log("CATCH RUN in VIEW TASKS handler ===>", error);
      setLoader(false);
    }
  };

  const giveRemarkshandler = async (task_id) => {
    if (remarks === "") {
      alert("Select Remarks");
    } else {
      try {
        setLoader(true);
        const response = await axios.post(
          "https://usertaskmanagement.herokuapp.com/giveremarks",
          {
            task_id: task_id,
            remarks: remarks,
          }
        );
        setLoader(false);
        console.log(response.data);
        if (response.data.status === true) {
          viewTaskhandler();
          setRemarks("");
        } else {
          alert(response.data.message);
          setLoader(false);
        }
      } catch (error) {
        console.log("CATCH RUN in GIVE REMARKS handler ===>", error);
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    viewTaskhandler();
  }, []);

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <>
          <AdminHeader />
          <Container>
            <h3 className="text-center mt-3 bg-light text-dark p-2">Tasks</h3>

            <Table responsive striped bordered hover size="sm" className="mt-2">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Remarks</th>
                  <th>Select Remarks</th>
                  <th>Give Remarks</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {userTasks.map((task, i) => {
                  return (
                    <tr key={task._id}>
                      <td>{i}</td>
                      <td className="text-capitalize">{task.title}</td>
                      <td className="text-capitalize">{task.description}</td>
                      <td className="text-capitalize">{task.priority}</td>
                      <td className="text-capitalize">{task.status}</td>
                      <td>{new Date(task.time).toLocaleString().split(",")}</td>
                      {task.remarks === "pending" ? (
                        <td className="text-danger text-capitalize fw-bold">
                          {task.remarks}
                        </td>
                      ) : (
                        <td className="text-success text-capitalize fw-bold">
                          {task.remarks}
                        </td>
                      )}
                      <td>
                        <Form.Group>
                          <Form.Select
                            aria-label="Remarks"
                            className="shadow-none border-dark rounded-0 px-1 py-0"
                            style={{ fontSize: "14px" }}
                            // value={task.remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          >
                            <option value="">Select Remarks</option>
                            {remarksOptions.map((remarksOption) => (
                              <option
                                key={remarksOption.id}
                                value={remarksOption.value}
                              >
                                {remarksOption.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </td>
                      <td className="d-flex justify-content-center align-item-center p-0">
                        <Button
                          variant="success"
                          size="sm"
                          className="rounded-0"
                          onClick={() => giveRemarkshandler(task._id)}
                        >
                          Give Remarks
                        </Button>
                      </td>
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

export default UserTasks;
