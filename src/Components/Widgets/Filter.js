import React, { Component } from 'react';

// Libs
import PropTypes from 'prop-types'

// Styles
import '../../styles/Components/Widgets/Filter.css';

// Assets
import assets  from '../../Assets';

// Constants
import { placeHolders } from '../../Constants/Constants';

class Filter extends Component {
    static propTypes = {
        /**
         * Function to set a search criteria
         */
        filterTasks: PropTypes.func
    };

    static defaultProps = {
        filterTasks: () => {}
    };

    /**
     * Call the filter by name API
     * @param {object} event
     */
    _filterTasks = (event) => {
        this.props.filterTasks(event.target.value);
    };

    render() {
        return(
            <div className="header">
                <div className="filter">
                    <input
                        className="filter-input"
                        placeholder={placeHolders.filter_placeholder}
                        onChange={this._filterTasks}
                        type="text"
                    />
                    <img className="search-icon" src={assets.searchIcon} alt="" />
                </div>
            </div>
        )
    }
}

export default Filter;