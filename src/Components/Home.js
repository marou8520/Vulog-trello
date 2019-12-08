import React, { Component } from 'react';

// Components
import Card from './Card';
import Filter from './Widgets/Filter';
import Loader from './Widgets/Loader';
import TaskPopup from './TaskPopup';
import Toast from './Widgets/Toast';

// Styles
import '../styles/Components/Home.css';

// Constants
import { toastList, cardTypes, requestTypes } from '../Constants/Constants';

// Actions
import { getTasks, filterTasks, createTask, updateTask, deleteTask } from '../Actions';

// Redux
import {connect} from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            task: {},
            newTask: true
        }
    }

    componentDidMount() {
        this.props.getTasks();
    }

    /**
     * Close the pop-up modal
     */
    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    };

    /**
     * Open the pop-up modal to create a new task
     * @param {string} taskType
     */
    addNewTask = (taskType) => {
        this.setState({
            task: {
                status: taskType
            },
            isModalOpen: true,
            newTask: true
        });
    };

    /**
     * Open the pop-up modal to edit the current task
     * @param {object} task
     */
    editTask = (task) => {
        this.setState({
            task: task,
            isModalOpen: true,
            newTask: false
        });
    };

    /**
     * Display toast for notifications
     */
    _displayToast = () => {
        const { requestSuccess, requestError} = this.props;

        if (requestError) {
            return <Toast type={requestTypes.error} message={requestError} />
        } else if (requestSuccess) {
            return <Toast type={requestTypes.success} message={toastList[requestSuccess]} />
        }
    };

    render() {
        const { isLoading,  filterTasks, createTask, updateTask, deleteTask } = this.props;
        const { isModalOpen, task, newTask } = this.state;

        return(
            <div className="home">
                <Filter filterTasks={filterTasks} />
                <div className="cards">
                    {
                        cardTypes.map((card, key) => (
                            <Card
                                key={key}
                                title={card.label}
                                taskType={card.type}
                                addNewTask={this.addNewTask}
                                editTask={this.editTask}
                            />
                        ))
                    }
                </div>
                {
                    isModalOpen &&
                        <TaskPopup
                            createTask={createTask}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                            isModalOpen={isModalOpen}
                            task={task}
                            newTask={newTask}
                            closeModal={this.closeModal}
                        />
                }
                <Loader loading={isLoading} />
                {this._displayToast()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.task.isLoading,
        requestError: state.task.requestError,
        requestSuccess: state.task.requestSuccess
    };
};

const mapDispatchToProps = { getTasks, filterTasks, createTask, updateTask, deleteTask };

export default connect(mapStateToProps, mapDispatchToProps)(Home);