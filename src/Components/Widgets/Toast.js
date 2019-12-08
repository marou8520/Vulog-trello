import React, { Component } from 'react';

// Libs
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";

// Constants
import { requestTypes } from '../../Constants/Constants';

class Toast extends Component {
    static propTypes = {
        /**
         * Type of the toast (success/error)
         */
        type: PropTypes.string,
        /**
         * Message to be displayed inside the toast
         */
        message: PropTypes.string,
    };

    static defaultProps = {
        type: '',
        message: ''
    };

    componentDidMount() {
        const { type, message } = this.props;

        if (type === requestTypes.success) {
            toast.success(message);
        } else if (type  === requestTypes.error) {
            toast.error(message);
        }
    }

    render() {
        return(
            <div>
                <ToastContainer
                    style={{ fontFamily: 'SulphurPoint' }}
                    hideProgressBar={true}
                    autoClose={3000}
                    position="bottom-center"
                />
            </div>
        )
    }
}

export default Toast;