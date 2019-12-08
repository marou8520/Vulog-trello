import React, { Component } from 'react';

// Libs
import PropTypes from "prop-types";

// Components
import Task from './Task';

// Styles
import '../styles/Components/Card.css';

// Redux
import connect from 'react-redux/es/connect/connect';

// Constants
import { placeHolders, buttonsLabels } from '../Constants/Constants';

// Assets
import assets from '../Assets';

class Card extends Component {
    static propTypes = {
        /**
         * Tasks of the current card
         */
        tasks: PropTypes.array,
        /**
         * Title of the card
         */
        title: PropTypes.string,
        /**
         * Function to open a task in the the pop-up
         */
        editTask: PropTypes.func,
        /**
         * Function to open the pop-up for a task creation
         */
        addNewTask: PropTypes.func
    };

    static defaultProps = {
        tasks: [],
        title: '',
        editTask: () => {},
        addNewTask: () => {}
    };

    render() {
        const { tasks, title, taskType, editTask, addNewTask } = this.props;

        return(
            <div className="card">
                <div className="card-title">{title}</div>
                <div className="tasks">
                    {
                        tasks.map((task, key) => (
                            <Task
                                key={key}
                                task={task}
                                editTask={editTask}
                            />
                        ))
                    }
                    {tasks.length === 0 && <div>{placeHolders.empty_card_placeholder}</div>}
                </div>
                <div className="add-task-button" onClick={() => addNewTask(taskType)}>
                    <div className="add-button-label">{buttonsLabels.add_task_button_label}</div>
                    <img className="add-button-icon" src={assets.addIcon} alt="" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        tasks: state.task.tasks.filter(task => {
            // If the task's status corresponding to the card's type
            // And if the task's name corresponding to search criterion
            return task.status === props.taskType && task.name.match(new RegExp(state.task.filterName, 'i'));
        })
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Card);