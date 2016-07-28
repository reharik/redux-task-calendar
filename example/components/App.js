import React from 'react';
import { Calendar } from '../../app/src/index';
import { taskClicked, openSpaceCLicked } from './../actions/calendarActions';
import { RETRIEVE_TASKS_REQUEST, RETRIEVE_TASKS_SUCCESS } from './../../app/src/index';
import uuid from 'uuid';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import TaskForm from './TaskForm';

export default () => {

  const a = uuid.v4();
  const b = uuid.v4();
  const c = uuid.v4();
  const d = uuid.v4();
  const getData = function(x) {
    return {
      tasks: [
        {
          display: 'fuck you!',
          startTime: '8:00 AM',
          endTime: '9:00 AM',
          date: new Date(),
          id: a,
          color: 'red',
          x
        },
        {
          display: 'fuck you!',
          startTime: '8:30 AM',
          endTime: '9:30 AM',
          date: new Date(),
          id: b,
          color: 'red',
          x
        },
        {
          display: 'fuck you!',
          startTime: '8:30 AM',
          endTime: '9:00 AM',
          date: new Date(),
          id: c,
          color: 'red',
          x
        },
        {
          display: 'fuck you!',
          startTime: '9:00 AM',
          endTime: '10:00 AM',
          date: new Date(),
          id: d,
          color: 'red',
          x
        }
      ]
    };
  };

  const retrieveData = (startDate, endDate, dispatch) => {
    var data = getData(moment().format('mm-ss'));
    window.setTimeout(function() {
      dispatch({type: RETRIEVE_TASKS_SUCCESS, data});
    }, 100);
    dispatch({
      type: RETRIEVE_TASKS_REQUEST
    });
  };

  return (<div > <TaskForm />
        <Calendar config={{
    increment: 15,
    width: '1200px',
    retrieveDataAction: retrieveData,
    taskClickedAction: taskClicked,
    openSpaceClickedAction: openSpaceCLicked
  }} /> </div>);
};
