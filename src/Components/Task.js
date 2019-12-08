import React, { Component } from 'react';

// Styles
import '../styles/Components/Task.css';

// Assets
import assets  from '../Assets';

// Libs
import PropTypes from 'prop-types';

class Task extends Component {
    static propTypes = {
        /**
         * Task to be updated or to deleted
         */
        task: PropTypes.object,
        /**
         * Function to open the current task in the the pop-up
         */
        editTask: PropTypes.func
    };

    static defaultProps = {
        task: null,
        editTask: () => {}
    };

    render() {
        const { task, editTask } = this.props;

        return(
            <div className="task" onClick={() => editTask(task)}>
                <div className="task-name">{task.name}</div>
                <img className="edit-button-icon" src={assets.editIcon} alt="" />
            </div>
        )
    }
}

export default Task;