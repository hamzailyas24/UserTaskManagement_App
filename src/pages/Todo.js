import { useState, useEffect } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import UsertaskTable from "../components/UsertaskTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const addTaskURL = "http://localhost:4000/addtask";

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

function Todo() {
  const user_id = localStorage.getItem("userID");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [datetime, setDatetime] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addTaskhandler = async () => {
    try {
      const response = await axios.post(addTaskURL, {
        user_id: user_id,
        title: title,
        description: description,
        priority: priority,
        time: datetime,
        status: status,
      });
      console.log(response);
      if (response.data.status === true) {
        alert(response.data.message);
        setTitle("");
        setDescription("");
        setPriority("");
        setDatetime("");
        setStatus("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = () => {
    if (
      title === "" ||
      description === "" ||
      priority === "" ||
      datetime === "" ||
      status === ""
    ) {
      alert("All fields are required");
    } else {
      console.log(user_id, title, description, priority, datetime, status);
      addTaskhandler();
    }
  };

  return (
    <>
      <Container fluid>
        <Header />
      </Container>
      <Container>
        {/* <h1 className="text-center my-2 bg-light text-dark p-2">
          {" "}
          Task Management Application{" "}
        </h1> */}
        <Form.Group className="mt-4">
          <Form.Label className="fw-bold">Title:</Form.Label>
          <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="Title"
            className="shadow-none border-dark rounded-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="fw-bold">Description:</Form.Label>
          <Form.Control
            placeholder="Description"
            as="textarea"
            rows={3}
            aria-label="Description"
            aria-describedby="Description"
            className="shadow-none border-dark rounded-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div className="row">
          <div className="col-md-4">
            <Form.Label className="mt-2 fw-bold">Priority:</Form.Label>
            <InputGroup
              className="border border-dark d-flex justify-content-center align-item-center"
              style={{ padding: "2px" }}
            >
              {priorityOptions.map((priorityOption) => (
                <Form.Check
                  type="radio"
                  className="m-1"
                  label={priorityOption.name}
                  key={priorityOption.id}
                  name="priorityOptions"
                  id={priorityOption.id}
                  value={priorityOption.value}
                  onChange={(e) => setPriority(e.currentTarget.value)}
                />
              ))}
            </InputGroup>
          </div>

          <div className="col-md-4">
            <Form.Group className="mt-2">
              <Form.Label className="fw-bold">Date Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                aria-label="Time"
                aria-describedby="Time"
                value={datetime}
                className="shadow-none border-dark rounded-0"
                onChange={(e) => setDatetime(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group className="mt-2">
              <Form.Label className="fw-bold">Status:</Form.Label>
              <Form.Select
                aria-label="Status"
                className="shadow-none border-dark rounded-0"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                {statusOptions.map((statusOption, i) => (
                  <option key={i} value={statusOption.value}>
                    {statusOption.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div className="d-grid gap-2 mt-3">
          <Button
            className="rounded-0 shadow-none text-white fw-bold"
            variant="success"
            size="lg"
            onClick={addTask}
          >
            ADD TASK
          </Button>
        </div>
        <UsertaskTable />
      </Container>
    </>
  );
}

export default Todo;
