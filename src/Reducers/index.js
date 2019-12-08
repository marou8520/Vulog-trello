import taskReducer from './Task';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    task: taskReducer
});

export default rootReducer;