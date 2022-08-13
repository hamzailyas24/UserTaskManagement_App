import { useState, useEffect } from "react";
import { Container, InputGroup, Form, Button } from "react-bootstrap";
import UsertaskTable from "../components/UsertaskTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <Container>
        <h1 className="text-center my-5"> User Task Management Application </h1>
        <InputGroup className="mt-3">
          <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="Title"
            className="shadow-none border-dark rounded-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mt-3">
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
        </InputGroup>
        <InputGroup className="mt-3">
          <Form.Label className="p-1">Priority:</Form.Label>
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
        <InputGroup className="mt-3">
          <Form.Control
            placeholder="Time"
            type="datetime-local"
            aria-label="Time"
            aria-describedby="Time"
            value={datetime}
            className="shadow-none border-dark rounded-0"
            onChange={(e) => setDatetime(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mt-3">
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
        </InputGroup>
        <div className="d-grid gap-2 mt-3">
          <Button
            className="rounded-0 shadow-none border-dark bg-dark text-white fw-bold"
            size="lg"
            onClick={addTask}
          >
            ADD TODO
          </Button>
        </div>
        <UsertaskTable />
      </Container>
    </>
  );
}

export default Todo;
