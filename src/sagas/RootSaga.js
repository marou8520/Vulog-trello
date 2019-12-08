import { all } from 'redux-saga/effects';
import taskSaga from './TaskSaga';

export default function* rootSaga() {
    yield all([
        taskSaga(),
    ]);
}