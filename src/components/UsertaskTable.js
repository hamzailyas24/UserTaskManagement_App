import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/actions/fetchUsertasks";

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
    id: 0,
    label: "Pending",
    value: "pending",
  },
  {
    id: 1,
    label: "Completed",
    value: "completed",
  },
  {
    id: 2,
    label: "Uncompleted",
    value: "uncompleted",
  },
];

function UsertaskTable() {
  const dispatch = useDispatch();
  const [updateID, setUpdateID] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePriority, setUpdatePriority] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [show, setShow] = useState(false);

  const deletetask = async (task_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/deletetask`,
        {
          task_id: task_id,
        }
      );
      if (response.data.status === true) {
        dispatch(fetchTasks());
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("CATCH RUN in deleteTask ===>", error);
    }
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
        const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/updatetask`,
          {
            task_id: task_id,
            title: updateTitle,
            description: updateDescription,
            priority: updatePriority,
            time: updateTime,
            status: updateStatus,
          }
        );

        if (response.data.status === true) {
          handleClose();
          dispatch(fetchTasks());
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log("CATCH RUN in updateTask ===>", error);
      }
    }
  };

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

  // function formatHoursTo12(date) {
  //   return date.getHours() % 12 || 12;
  // }

  const userTasks = useSelector((state) => state.userTasks.tasks);

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      dispatch(fetchTasks());
      console.log("USER_TASK_TABLE");
    }
  }, [dispatch]);

  return (
    <>
      <h3 className="text-center mt-5 bg-light text-dark p-2">Your Tasks</h3>
      <Table responsive striped bordered hover size="sm" className="mt-2">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map((task, index) => {
            return (
              <tr key={task._id} className="text-center text-capitalize">
                <td>{index}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                {task.remarks === "bad" ? (
                  <td className="text-danger fw-bold">{task.remarks}</td>
                ) : (
                  <td className="text-success fw-bold">{task.remarks}</td>
                )}
                <td>{new Date(task.time).toLocaleString().split(",")}</td>
                <td className="d-flex justify-content-center align-item-center">
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-0 fw-bold me-2"
                    onClick={() => {
                      handleShow(task);
                    }}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-0 fw-bold"
                    onClick={() => deletetask(task._id)}
                  >
                    DELETE
                  </Button>
                </td>
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
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
                      {priorityOptions.map((priority) => {
                        return (
                          <Form.Check
                            type="radio"
                            name="priority"
                            key={priority.id}
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
                        value={updateTime.substring(0, 16)}
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
                        {statusOptions.map((statusOption) => (
                          <option
                            key={statusOption.id}
                            value={statusOption.value}
                          >
                            {statusOption.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      size="lg"
                      className="rounded-0 fw-bold"
                      onClick={() => handleClose()}
                    >
                      Close
                    </Button>
                    <Button
                      variant="success"
                      size="lg"
                      className="rounded-0 fw-bold"
                      onClick={() => {
                        updatetask(updateID);
                        handleClose();
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default UsertaskTable;
