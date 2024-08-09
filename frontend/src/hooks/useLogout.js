import { useAuthContext } from "./useAuthContext";
import { useTaskContext } from "./useTaskContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();

    const { dispatch: dispatchTasks } = useTaskContext();

    const logout = () => {
        // remove the user from local storage
        localStorage.removeItem('user');

        dispatch({ type: 'LOGOUT' });

        // clear the tasks
        dispatchTasks({ type: 'SET_TASKS', payload: [] });
    };

    return { logout };
};