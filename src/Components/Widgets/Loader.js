import React, { Component } from 'react';

// Libs
import BeatLoader from 'react-spinners/BeatLoader';
import PropTypes from "prop-types";

class Loader extends Component {
    static propTypes = {
        /**
         * If the API request is pending
         */
        loading: PropTypes.bool
    };

    static defaultProps = {
        loading: false
    };

    render() {
        const { loading } = this.props;

        return(
            <div>
                <BeatLoader
                    size={15}
                    color={"#4A90E2"}
                    loading={loading}
                />
            </div>
        )
    }
}

export default Loader;