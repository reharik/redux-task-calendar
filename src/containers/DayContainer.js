import { connect } from 'react-redux';
import Day from '../components/Day';
import moment from 'moment';
import {process} from '../utils/widthAndColumn';
import {augmentTimes, normalizeTasks} from '../utils/calendarUtils';
import {openSpaceClickedAction, taskClickedAction} from './../modules/calendarModule'

function mapStateToProps(state, ownProps) {
  const calState = state.reduxTaskCalendar[ownProps.calendarName];
  let day = ownProps.date || calState.date || moment();
  day.utc();
  let filterToday = x => moment(x.date).format('YYYYMMDD') === day.format('YYYYMMDD');
  let thisView = calState.view === 'week' ? 'redux__task__calendar__week__' : 'redux__task__calendar__';
  let classes = thisView + 'day__items__slot ';
  let unprocessedTasks = state[calState.config.dataSource]
    .filter(filterToday)
    .filter(a => calState.config.taskFilter(a, state))
    .map(a => calState.config.taskMap(a, state));
  // console.log(`==========unprocessedTasks=========`);
  // console.log(unprocessedTasks);
  // console.log(`==========END unprocessedTasks=========`);
  let tasks = process(normalizeTasks(unprocessedTasks, calState.config));
  // console.log(`==========tasks=========`);
  // console.log(tasks);
  // console.log(`==========END tasks=========`);
  return {
    view: calState.view,
    tasks,
    times: augmentTimes(classes, day, calState.config),
    dayName: day.format('dddd'),
    isToday: day.format('YYYYMMDD') === moment().format('YYYYMMDD'),
    displayTimeFormat: calState.config.displayTimeFormat,
    fetchDateFormat: calState.config.fetchDateFormat,
    increment: calState.config.increment,
    calendarName: ownProps.calendarName,
    updateTaskViaDND: calState.config.updateTaskViaDND,
    openSpaceClickedEvent: calState.config.openSpaceClickedEvent,
    taskClickedEvent: calState.config.taskClickedEvent
  };
}

export default connect(mapStateToProps, {openSpaceClickedAction, taskClickedAction})(Day);
