import { FaCheck } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const DeleteTask = () => {

    const BASE_URL = 'http://localhost:6700/api/tasks';

    const { id } = useParams();

    const navigate = useNavigate();

    console.log(id);

    const handleDelete = async () => {
        const res = await axios.delete(`${BASE_URL}/${id}`)
            .then(() => {
                navigate('/tasks');
            })
            .catch(err => {
                console.log(err.message);
            });
        console.log(res.data);
        navigate('/tasks');
    }

    return (
        <section>
            <div className="bg-white text-center flex flex-col items-center gap-3 rounded-lg p-3">
                <h1 className="text-gray-800 text-2xl">Delete Task</h1>
                <p className="text-gray-500">Are you sure you want to delete this task ?</p>
                <button onClick={handleDelete}>
                    <Link to="">
                        <FaCheck className="text-green-500 text-2xl" />
                    </Link>
                </button>
            </div>
        </section>
    )
}

export default DeleteTask
