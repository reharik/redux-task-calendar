import { connect } from 'react-redux';
import WeekDay from './../components/WeekDay';
import moment from 'moment';
import {process} from './../utils/widthAndColumn';
import {augmentTimes} from './../utils/calendarUtils';
import { config } from './../utils/configValues';

function mapStateToProps(state, ownProps) {
  var day = ownProps.date || state.selectedDay || moment();
  var filterToday = x => moment(x.date).format('YYYYMMDD') === day.format('YYYYMMDD');
  var thisView = state.calendarView.view === 'week' ? 'week__' : '';
  var classes = thisView + 'day__items__slot ';

  var tasks = process(state.tasks.filter(filterToday));
  return {
    view: state.calendarView.view,
    tasks,
    times: augmentTimes(config, classes, day),
    dayName: day.format('dddd'),
    isToday: day.format('YYYYMMDD') === moment().format('YYYYMMDD'),
    config
  };
}

export default connect(mapStateToProps)(WeekDay);
