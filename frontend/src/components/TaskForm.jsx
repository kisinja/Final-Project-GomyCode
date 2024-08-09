import { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import Loader from "./Loader";
import { useAuthContext } from "../hooks/useAuthContext";

const TasksForm = () => {
    const { dispatch } = useTaskContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [emptyFields, setEmptyFields] = useState([]);

    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = "http://localhost:8430/api/tasks/";

    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setErr("You must be logged in")
            return
        }

        setLoading(true);

        const newTask = {
            title,
            description,
        };

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newTask),
        });

        const data = await res.json();

        if (!res.ok) {
            setLoading(false);
            setErr(data.error);
            setEmptyFields(data.emptyFields);
            setSuccess('');
            return;
        }

        if (res.ok) {
            setTitle('');
            setDescription('');
            setErr('');
            setEmptyFields([]);
            setSuccess('Task added successfully');
            setLoading(false);
            dispatch({ type: 'CREATE_TASK', payload: data })
        }
    };

    return (
        <form className="tasks-form w-[350px] fixed right-3 bg-white p-4 top-[97px] rounded shadow" id="form">
            <h3 className="text-xl font-bold tracking-wider text-center mb-3" id="">Add a new Task</h3>

            {success && <div className="success">{success}</div>}

            <div className="form-control">
                <label htmlFor="title">Task Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={Array.isArray(emptyFields) && emptyFields.includes('title') ? "error" : ""} />
            </div>
            <div className="form-control">
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={description} className={Array.isArray(emptyFields) && emptyFields.includes('description') ? "error" : ""} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {err && <div className="error">{err}</div>}



            <div className="flex items-center justify-center">
                {loading ? (
                    <Loader />
                ) : (
                    <button className="btn" onClick={handleSubmit}>
                        Add Task
                    </button>
                )}
            </div>
        </form >
    );
};

export default TasksForm;