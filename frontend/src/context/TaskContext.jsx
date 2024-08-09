import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const TaskContext = createContext();

export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload,
            };
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks],
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter(task => task._id !== action.payload._id),
            }
        default:
            return state;
    }
};

export const TaskContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(taskReducer, {
        tasks: []
    });

    return (
        <TaskContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

TaskContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};