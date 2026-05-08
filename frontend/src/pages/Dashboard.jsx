import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://task-manager-backend-bhre.onrender.com/api/auth/login/api/tasks",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  const createTask = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks",

        {
          title: title
        },

        {
          headers: {
            Authorization: token
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
        `http://localhost:5000/api/tasks/${id}`,

        {
          status: "done"
        },

        {
          headers: {
            Authorization: token
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