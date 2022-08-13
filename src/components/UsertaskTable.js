import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const baseURL = "http://localhost:4000/getalltasks";

const priorityOptions = [
  {
    id: 1,
    name: "High",
    value: "high",
  },
  {
    id: 2,
    name: "Normal",
    value: "normal",
  },
  {
    id: 3,
    name: "Low",
    value: "low",
  },
];

const statusOptions = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Uncompleted",
    value: "uncompleted",
  },
];

function UsertaskTable() {
  const user_id = localStorage.getItem("userID");
  const [tasks, setTasks] = useState([]);
  const [updateID, setUpdateID] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePriority, setUpdatePriority] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUpdateID("");
    setUpdateTitle("");
    setUpdateDescription("");
    setUpdatePriority("");
    setUpdateTime("");
    setUpdateStatus("");
  };
  const handleShow = (task) => {
    setShow(true);
    setUpdateID(task._id);
    setUpdateTitle(task.title);
    setUpdateDescription(task.description);
    setUpdatePriority(task.priority);
    setUpdateTime(task.time);
    setUpdateStatus(task.status);
  };

  const updatetask = async (task_id) => {
    if (
      updateTitle === "" ||
      updateDescription === "" ||
      updatePriority === "" ||
      updateTime === "" ||
      updateStatus === ""
    ) {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await axios.post("http://localhost:4000/updatetask", {
          task_id: task_id,
          title: updateTitle,
          description: updateDescription,
          priority: updatePriority,
          time: updateTime,
          status: updateStatus,
        });
        console.log({
          updateTitle,
          updateDescription,
          updatePriority,
          updateTime,
        });
        console.log(response.data);

        if (response.data.status === true) {
          handleClose();
          getTasks();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log("error ===>", error);
        alert("Something went wrong");
      }
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.post(baseURL, {
        user_id: user_id,
      });
      setTasks(response.data.tasks);
      console.log(response.data.tasks);
    } catch (error) {
      console.log("error ===>", error);
    }
  };

  const deletetask = async (task_id) => {
    try {
      const response = await axios.post("http://localhost:4000/deletetask", {
        task_id: task_id,
      });
      console.log(response.data);
      if (response.data.status === true) {
        getTasks();
      } else {
        alert("Something went wrong in deleting task");
      }
    } catch (error) {
      console.log("error ===>", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Table responsive striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Time</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={index} className="text-center text-capitalize">
                <td>{task._id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.time).toLocaleString().split(",")}</td>
                <td>{task.status}</td>
                <td>{task.remarks}</td>
                <td className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-0 me-2 fw-bold"
                    onClick={() => {
                      handleShow(task);
                    }}
                  >
                    EDIT TASK
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          placeholder="Title"
                          aria-label="Title"
                          aria-describedby="Title"
                          className="shadow-none border-dark rounded-0"
                          value={updateTitle}
                          onChange={(e) => {
                            setUpdateTitle(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Description"
                          aria-label="Description"
                          aria-describedby="Description"
                          className="shadow-none border-dark rounded-0"
                          value={updateDescription}
                          onChange={(e) => setUpdateDescription(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        {priorityOptions.map((priority, index) => {
                          return (
                            <Form.Check
                              type="radio"
                              name="priority"
                              key={index}
                              label={priority.name}
                              value={priority.value}
                              checked={updatePriority === priority.value}
                              onChange={(e) =>
                                setUpdatePriority(e.currentTarget.value)
                              }
                            />
                          );
                        })}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          placeholder="Time"
                          aria-label="Time"
                          aria-describedby="Time"
                          className="shadow-none border-dark rounded-0"
                          value={updateTime}
                          onChange={(e) => setUpdateTime(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          aria-label="Status"
                          className="shadow-none border-dark rounded-0"
                          value={updateStatus}
                          onChange={(e) => setUpdateStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          {statusOptions.map((statusOption, i) => (
                            <option key={i} value={statusOption.value}>
                              {statusOption.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          updatetask(updateID);
                          handleClose();
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-0 fw-bold"
                    onClick={() => deletetask(task._id)}
                  >
                    DELETE TASK
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default UsertaskTable;
