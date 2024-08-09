import { useEffect } from "react";
import TaskDetails from "../components/TaskDetails";
import TasksForm from "../components/TaskForm";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

    const BASE_URL = "http://localhost:8430/api/tasks";

    const { tasks, dispatch } = useTaskContext();


    const { user } = useAuthContext();

    useEffect(() => {
        document.title = "Task Buddy | Home";
        const fetchTasks = async () => {
            const res = await fetch(BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                dispatch({ type: 'SET_TASKS', payload: data });
            } else {
                console.error(data.message);
            }
        };

        if (user) {
            fetchTasks();
        }

    }, [user, dispatch]);

    return (
        <div className="home">
            <div className="tasks">

                {tasks && tasks.map(task => (
                    <TaskDetails key={task._id} task={task} />
                ))}
            </div>
            <TasksForm />
        </div>
    );
};

export default Home;