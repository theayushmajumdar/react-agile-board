import React, { useState } from "react";

const Board = () => { 
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTicket, setNewTicket] = useState("");

  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setBacklog([...backlog, newTicket]);
      setNewTicket("");
    }
  };

  // Pass the ticketName and sourceColumn name via dataTransfer
  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  // Receive the ticketName and sourceColumn name via dataTransfer
  // Push the ticketName to targetColumn array and remove it from sourceColumn
  const handleDrop = (e, targetColumn) => {
    const task = e.dataTransfer.getData("task");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (targetColumn !== sourceColumn) {
      switch (targetColumn) {
        case "backlog":
          setBacklog([...backlog, task]);
          break;
        case "inProgress":
          setInProgress([...inProgress, task]);
          break;
        case "completed":
          setCompleted([...completed, task]);
          break;
        default:
          break;
      }

      switch (sourceColumn) {
        case "backlog":
          setBacklog(backlog.filter((t) => t !== task));
          break;
        case "inProgress":
          setInProgress(inProgress.filter((t) => t !== task));
          break;
        case "completed":
          setCompleted(completed.filter((t) => t !== task));
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="add-ticket">
        <input
          type="text"
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
          placeholder="Enter new ticket"
        />
        <button onClick={handleAddTicket}>Add Text</button>
      </div>

      <div className="board">
        <Column
          title="Backlog"
          tasks={backlog}
          onDrop={(e) => handleDrop(e, "Backlog")}
          onDragStart={handleDragStart}
        />
        <Column
          title="InProgress"
          tasks={inProgress}
          onDrop={(e) => handleDrop(e, "InProgress")}
          onDragStart={handleDragStart}
        />
        <Column
          title="Completed"
          tasks={completed}
          onDrop={(e) => handleDrop(e, "Completed")}
          onDragStart={handleDragStart}
        />
      </div>
    </>
  );
};

export default Board; 

const Column = ({ title, tasks, onDrop, onDragStart }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="task"
          draggable
          onDragStart={(e) => onDragStart(e, task, title)}
        >
          {task}
        </div>
      ))}
    </div>
  );
};
