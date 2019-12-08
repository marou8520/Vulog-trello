import { takeEvery , call, put } from 'redux-saga/effects'
import axios from 'axios';

import * as types from '../Actions/ActionTypes';

const baseURL = 'http://localhost:3001';

export default function* taskSaga() {
    yield takeEvery(types.GET_TASKS, fetchTasks);
    yield takeEvery(types.CREATE_TASK, createTask);
    yield takeEvery(types.UPDATE_TASK, updateTask);
    yield takeEvery(types.DELETE_TASK, deleteTask);
}

function* fetchTasks() {
    try {
        const payload = yield call(getData);
        yield put({type: types.TASKS_RECEIVED, data: payload.data});
    } catch (e) {
        yield put({type: types.API_REQUEST_FAILED, error: e});
    }
}

function* createTask(action) {
    try {
        const payload = yield call(postData, action.payload.task);
        yield put({type: types.TASK_CREATED, data: payload.data});
    } catch (e) {
        yield put({type: types.API_REQUEST_FAILED, error: e});
    }
}

function* updateTask(action) {
    try {
        const payload = yield call(putData, action.payload.task);
        yield put({type: types.TASK_UPDATED, data: payload.data});
    } catch (e) {
        yield put({type: types.API_REQUEST_FAILED, error: e});
    }
}

function* deleteTask(action) {
    try {
        yield call(deleteData, action.id);
        yield put({type: types.TASK_DELETED, id: action.id});
    } catch (e) {
        yield put({type: types.TASK_DELETED, error: e});
    }
}

function getData() {
    return axios.request({
        method: 'get',
        url: `${baseURL}/tasks`
    });
}

function postData(task) {
    return axios.request({
        method: 'post',
        url: `${baseURL}/tasks`,
        data: task
    });
}

function putData(task) {
    return axios.request({
        method: 'put',
        url: `${baseURL}/tasks/${task.id}`,
        data: task
    });
}

function deleteData(id) {
    return axios.request({
        method: 'delete',
        url: `${baseURL}/tasks/${id}`
    });
}