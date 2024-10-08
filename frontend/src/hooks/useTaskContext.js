import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasksContext must be used within a TaskContextProvider');
    }

    return context;
};