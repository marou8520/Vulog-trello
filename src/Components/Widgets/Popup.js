import React from 'react';
import { Component } from 'react';

// Libs
import Modal from 'react-modal';
import PropTypes from "prop-types";

class Popup extends Component {
    static propTypes = {
        /**
         * If the pop-up is open
         */
        isModalOpen: PropTypes.bool,
        /**
         * Content of the popup
         */
        content: PropTypes.object,
    };

    static defaultProps = {
        isModalOpen: false,
        content: null
    };

    render() {
        const { isModalOpen, content } = this.props;
        const customStyles = {
            overlay : {
                backgroundColor       : 'rgba(0, 0, 0, 0.7)'
            },
            content : {
                backgroundColor       : '#f6f6f6',
                width                 : '300px',
                height                : '420px',
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)',
                flexDirection         : 'column',
                display               : 'flex',
                flex                  : 1,
                border                : 0
            }
        };

        return (
            <Modal style={customStyles} ariaHideApp={false} isOpen={isModalOpen}>
                {content}
            </Modal>
        )
    }
}


export default Popup;