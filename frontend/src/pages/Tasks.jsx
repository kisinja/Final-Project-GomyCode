import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "../components/Loader";

const Tasks = () => {

    const user = useSelector((state) => state.auth.user.user);
    console.log(user);
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const BASE_URL = 'http://localhost:6700/api/tasks';

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        const fetchTasks = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/${user._id}`);
                setTasks(res.data.tasks);
                setLoading(false);
                console.log(tasks);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchTasks();
    }, [user, navigate]);

    return (
        <section className="divide-y-2">
            {loading && <Loader />}
            {tasks && tasks.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-white text-3xl">Tasks</h1>
                        <button className="bg-white p-2 w-12 h-12 rounded-full flex items-center justify-center">
                            <Link to="/addTask">
                                <FaPlusCircle className="text-3xl" />
                            </Link>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 pt-8 gap-5">
                        {tasks.map((task) => (
                            <div key={task._id} className="bg-white w-[350px] h-[230px] flex flex-col justify-between py-3 px-5 rounded-lg">
                                <h3><strong>Title: </strong>{task.title}</h3>
                                <p><strong>Description: </strong>{task.description}</p>
                                <p><strong>Status: </strong>{task.status}</p>
                                <div className="flex gap-3 justify-center items-center">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                        <Link to={`/tasks/edit/${task._id}`}>
                                            <FaEdit />
                                        </Link>
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                                        <Link to={`/tasks/delete/${task._id}`}>
                                            <MdDelete />
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white py-4 px-6 text-center text-red-500 text-lg mx-auto mt-5 flex flex-col gap-4">
                        <h1>No tasks found at the moment</h1>
                        <button className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-500">
                            <Link to='/addTask' className="text-white">Add Task</Link>
                        </button>
                    </div>

                </>

            )}
        </section>
    )
}

export default Tasks;