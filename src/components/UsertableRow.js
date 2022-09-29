import axios from "axios";
import { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

function UsertableRow() {
  return (
    <>
      <td>{i}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{priority}</td>
      <td>{status}</td>
      <td>{remarks}</td>
      <td>{new Date(time).toLocaleString().split(",")}</td>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
                  onChange={(e) => setUpdatePriority(e.currentTarget.value)}
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
                <option key={statusOption.id} value={statusOption.value}>
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
    </>
  );
}

export default UsertableRow;
