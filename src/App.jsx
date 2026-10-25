import { useState , useEffect} from 'react';
import './App.css';
function App()
{
   const [task, setTask] = useState("");
   const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
   });
   const [editIndex, setEditIndex] = useState(null);
   const addTask = () => {
    if (task.trim() !== "") {
   setTasks([...tasks,
    {
        text: task,
        completed: false
    }
   ]);
   setTask("");
}
};
   const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    return (
    <div className="container">
        <h1> My Task Manager </h1>
        <h3> Total Tasks: {tasks.length} </h3>
        <h3> Completed Tasks: {tasks.filter(t => t.completed).length} </h3>
        <h3> Pending Tasks: {tasks.filter(t => !t.completed).length} </h3>

        <input type="text" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={() => {
            if (editIndex !== null) {
                setTasks(tasks.map((item, i) => i === editIndex ? {...item, text: task} : item));
                setEditIndex(null);
                setTask("");
            }
            else {
                addTask();
            }
        }}>
         {editIndex !== null ? "Update" : "Add"} </button>
         <ul>
            {tasks.map((item, index) => (
                <li key={index}>
                    <span
                    style={{
                        textDecoration:
                        item.completed ? "line-through" : "none"
                    }}
                    >
                        {item.text}
                        <button onClick={() => {
                            setEditIndex(index);
                            setTask(item.text);
                        }}>
                            Edit
                        </button> 
                    </span>
                    <button onClick={() => setTasks(tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task))}>
                        {item.completed ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                </li>
            ))}
        </ul>
          </div>
   )
}
export default App;
