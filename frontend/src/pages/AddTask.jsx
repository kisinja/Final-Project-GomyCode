import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AddTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.auth.user.user);

    console.log(user);

    const navigate = useNavigate();

    const BASE_URL = "http://localhost:6700/api/tasks";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const addTask = async () => {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user._id,
                    title,
                    description,
                }),
            });

            const data = await response.json();

            console.log(data);
            setLoading(false);

            navigate("/tasks");

            if (data.success) {
                setTitle("");
                setDescription("");
            }
        }

        addTask();
    };

    return (
        <section className="">
            <div className="form_container mt-[70px]">
                <form action="" className="">
                    <h2 className="text-2xl text-center">Add Task</h2>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder="Enter a title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" className="resize-none border-2 rounded outline-none p-3" cols="20" rows="10" placeholder="Enter a description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    {loading && <Loader />}
                    <button onClick={handleSubmit}>Add Task</button>
                </form>
            </div>
        </section>
    )
}

export default AddTask