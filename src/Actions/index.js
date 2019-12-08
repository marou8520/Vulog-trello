import * as types from './ActionTypes';

export const getTasks = () => {
    return {
        type: types.GET_TASKS,
    };
};

export const createTask = (task) => {
    return {
        type: types.CREATE_TASK,
        payload: task
    };
};

export const updateTask = (task) => {
    return {
        type: types.UPDATE_TASK,
        payload: task
    };
};

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id: id
    };
};

export const filterTasks = (name) => {
    return {
        type: types.FILTER_TASKS,
        name: name
    };
};
