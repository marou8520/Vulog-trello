import * as types from '../Actions/ActionTypes';

const taskReducer = (state, action) => {

    state = state || {
        tasks: [],
        isLoading: false,
        filterName: '',
        requestError: null,
        requestSuccess: null
    };

    switch (action.type) {
        case types.GET_TASKS:
        case types.CREATE_TASK:
        case types.UPDATE_TASK:
        case types.DELETE_TASK:
            return {
                ...state,
                isLoading: true,
                requestSuccess: null,
                requestError: null
            };

        case types.TASKS_RECEIVED:
            return {
                ...state,
                isLoading: false,
                tasks: action.data
            };

        case types.TASK_CREATED:
            return {
                ...state,
                isLoading: false,
                tasks: [...state.tasks, action.data],
                requestSuccess: 'taskCreated'
            };

        case types.TASK_UPDATED:
            const index = state.tasks.findIndex((item) => item.id === action.data.id);

            return {
                ...state,
                isLoading: false,
                tasks: Object.assign([...state.tasks], {[index]: action.data}),
                requestSuccess: 'taskUpdated'
            };

        case types.TASK_DELETED:
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.filter(task => task.id !== action.id),
                requestSuccess: 'taskDeleted'
            };

        case types.FILTER_TASKS:
            return {
                ...state,
                filterName: action.name
            };

        case types.API_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                requestError: action.error.toString()
            };

        default:
            return state
    }
};

export default taskReducer;