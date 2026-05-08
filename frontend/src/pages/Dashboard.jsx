import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const API = "https://task-manager-backend-bhre.onrender.com";

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.get(`${API}/api/tasks`, {
  headers: {
    Authorization: localStorage.getItem("token")
  }
});

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
  `${API}/api/tasks`,
  { title },
  {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }
);

      alert("Task Created");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };


  const updateStatus = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
  `${API}/api/tasks/${id}`,
  { status: "done" },
  {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }
);

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);


  return (

    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      <h3>Total Tasks: {tasks.length}</h3>

      <input
        placeholder="Enter task title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>
        Create Task
      </button>

      <hr />

      {
        tasks.map((task) => (

          <div
            key={task._id}

            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{task.title}</h3>

            <p>Status: {task.status}</p>

            <button
              onClick={() => updateStatus(task._id)}
            >
              Mark Done
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;