import PropTypes from 'prop-types';
import RelativeTime from './RelativeTime';
import { useTaskContext } from '../hooks/useTaskContext';
import { FaRegTrashCan } from "react-icons/fa6";
import { useAuthContext } from '../hooks/useAuthContext';

const TaskDetails = ({ task }) => {

    const timeStamp = task.createdAt;

    const { dispatch } = useTaskContext();

    const { user } = useAuthContext();

    const handleClick = async () => {

        if (!user) {
            return;
        }

        const res = await fetch(`http://localhost:8930/api/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const data = await res.json();

        if (res.ok) {
            dispatch({ type: 'DELETE_TASK', payload: data });
        }
    };

    return (
        <div className="task-details space-y-2">
            <h4 className='tracking-wider'>{task.title}</h4>
            <p className='tracking-wider'><strong>Description: </strong>{task.description}</p>
            <p className={!task.isComplete ? "line-through" : ""}>Completed</p>

            {/* Date formatter to "1 Day ago" */}
            <RelativeTime timestamp={timeStamp} />

            <span onClick={handleClick} title={`Remove '${task.title}'`}>
                <FaRegTrashCan className='text-xl text-red-600' />
            </span>
        </div>
    );
};

TaskDetails.propTypes = {
    task: PropTypes.object.isRequired,
};

export default TaskDetails;