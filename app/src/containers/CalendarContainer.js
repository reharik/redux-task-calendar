import React from 'react';
import { connect } from 'react-redux'
import Calendar from './../components/Calendar'
import { updateConfigs } from './../utils/configValues';

function mapStateToProps(state, ownProps) {
    var calendarConfig = updateConfigs(ownProps.config);
    return {
        calendarView: state.calendarView || calendarConfig.defaultView,
        calendarConfig
    }
}


export default connect(mapStateToProps)(Calendar);
