import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const EditTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);


    const { id } = useParams();
    console.log(id);


    const navigate = useNavigate();

    const BASE_URL = "http://localhost:6700/api/tasks";

    useEffect(() => {
        const getTask = async () => {
            const res = await axios.get(`${BASE_URL}/${id}`)
                .then((res) => {
                    console.log(res.data);
                    /* setTitle(res.data.title);
                    setDescription(res.data.description); */
                    setLoading(false);
                    console.log(title, description);
                })
                .catch(err => {
                    console.log(err.message);
                });

            const data = await res.json();

            console.log(data);
            setLoading(false);

            navigate("/tasks");
        }

        getTask();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const task = {
            title,
            description
        };

        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();
        console.log(data);
        setLoading(false);
        navigate("/tasks");
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

export default EditTask