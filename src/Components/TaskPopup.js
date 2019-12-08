import React, { Component } from 'react';

// Styles
import '../styles/Components/TaskPopup.css';

// Assets
import assets from '../Assets';

// Components
import Popup from './Widgets/Popup'

// Libs
import PropTypes from 'prop-types';

// Constants
import { cardTypes, inputLabels, buttonsLabels } from '../Constants/Constants';

class TaskPopup extends Component {
    static propTypes = {
        /**
         * Task to update, create or delete
         */
        task: PropTypes.object,
        /**
         * If the pop-up is open
         */
        isModalOpen: PropTypes.bool,
        /**
         * If it's a new task
         */
        newTask: PropTypes.bool,
        /**
         * Function to delete a task
         */
        deleteTask: PropTypes.func,
        /**
         * Function to update a task
         */
        updateTask: PropTypes.func,
        /**
         * Function to create a task
         */
        createTask: PropTypes.func,
        /**
         * Function to close the pop-up
         */
        closeModal: PropTypes.func
    };

    static defaultProps = {
        task: null,
        isModalOpen: false,
        newTask: false,
        deleteTask: () => {},
        updateTask: () => {},
        createTask: () => {},
        closeModal: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: props.task.name || '',
                description: props.task.description || '',
                status: props.task.status
            }
        }
    }

    /**
     * Call the create task API
     * @param {object} event
     */
    _addTask = (event) => {
        event.preventDefault();
        const { createTask, closeModal} = this.props;
        const { formData } = this.state;
        const payload = {
            task: {
                ...formData
            }
        };

        createTask(payload);
        closeModal();
    };

    /**
     * Call the API to update task informations
     * @param {object} event
     */
    _editTask = (event) => {
        event.preventDefault();
        const { task, updateTask, closeModal } = this.props;
        const { formData } = this.state;
        const payload = {
            task: {
                id: task.id,
                ...formData
            }
        };

        updateTask(payload);
        closeModal();
    };

    /**
     * Call the API to delete the task
     * @param {object} event
     */
    _deleteTask = (event) => {
        event.preventDefault();
        const { task, deleteTask, closeModal } = this.props;

        deleteTask(task.id);
        closeModal();
    };

    /**
     * Called to handle the changes of the inputs
     * @param {object} event
     */
    _onChange = (event) => {
        let formData = { ...this.state.formData };
        formData[event.target.name] = event.target.value;

        this.setState({
            formData
        });
    };

    /**
     * Display the footer of the popup
     */
    _displayDialogFooter () {
        const { newTask, closeModal } = this.props;

        return (
            <div className="modal-footer">
                {
                    newTask ?
                    <button className="add-button button" type="submit" onClick={this._addTask}>
                        {buttonsLabels.add_task_button_label}
                    </button>
                    :
                    <div className="left-buttons-container">
                        <button className="save-button button" type="submit" onClick={this._editTask}>
                            <img className="icon" src={assets.saveIcon} alt="" />
                            <div>{buttonsLabels.save_task_button}</div>
                        </button>
                        <button className="delete-button button" type="submit" onClick={this._deleteTask}>
                            <img className="icon" src={assets.deleteIcon} alt="" />
                            <div>{buttonsLabels.delete_task_button}</div>
                        </button>
                    </div>
                }
                <button
                    className="cancel-button button"
                    onClick={closeModal}>
                    {buttonsLabels.cancel_button}
                </button>
            </div>
        )
    }
    /**
     * Return popup content
     */
    _getContent () {
        const { formData: { name, description, status } } = this.state;
        const { newTask, closeModal } = this.props;
        const disabledStatus = newTask ? 'disabled-status ' : '';

        return (
            <div>
                <div className="modal-header">
                    <button className="close-button-button" onClick={closeModal}>
                        <img className="icon" src={assets.closeIcon} alt="" />
                    </button>
                </div>
                <form className="popup">
                    <div className="modal-body">
                        <div className="input-container">
                            <label>{inputLabels.task_name_label}</label>
                            <input
                                className="form-input name"
                                name="name"
                                type="text"
                                required={true}
                                value={name}
                                onChange={this._onChange}
                            />
                        </div>
                        <div className="input-container">
                            <label>{inputLabels.task_description_label}</label>
                            <textarea
                                className="form-input description"
                                value={description}
                                name="description"
                                rows="8"
                                onChange={this._onChange}
                            />
                        </div>
                        <div className="input-container">
                            <label>{inputLabels.task_status_label}</label>
                            <select
                                name="status"
                                className={`${disabledStatus}status`}
                                defaultValue={status}
                                disabled={newTask}
                                onChange={this._onChange}>
                                {
                                    cardTypes.map((status, key) => (
                                        <option key={key} value={status.type}>
                                            {status.label}
                                        </option>
                                     ))
                                }
                            </select>
                        </div>
                    </div>
                    {this._displayDialogFooter()}
                </form>
            </div>
        )
    }

    render() {
        const { isModalOpen } = this.props;

        return(
            <Popup isModalOpen={isModalOpen} content={this._getContent()} />
        )
    }
}

export default TaskPopup;