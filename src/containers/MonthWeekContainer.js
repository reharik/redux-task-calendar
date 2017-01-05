
import { connect } from 'react-redux';
import MonthWeek from '../components/MonthWeek';
import moment from 'moment';
import { config } from '../utils/configValues';

function mapStateToProps(state, ownProps) {

  var	buildClasses = function(day, today, selectedDay, index) {

    var classes = 'redux__task__calendar__month__day';
    if (today.isSame(day, 'day')) {
      classes += ' redux__task__calendar__month__day__today';
    }

    if (selectedDay.isSame(day, 'day')) {
      classes += ' redux__task__calendar__month__day__selected';
    }
    if ((index + 1) % 7 === 0) {
      classes += ' redux__task__calendar__month__day__last';
    }

    if (day.month() !== selectedDay.month()) {
      classes += ' redux__task__calendar__month__day__otherMonth';
    }
    return classes;
  };

  var weekDays = week => week.map((date, idx) => {
    var day = moment(date);
    day.classes = buildClasses(day, moment(), state.calendarDate, idx);
    day.tasks = state.calendarTasks.filter(e => e.date.isSame(day, 'day'));
    return day;});
  return {
    weekDays: weekDays(ownProps.week),
    calendarConfig: ownProps.calendarConfig,
    actions: ownProps.actions
  };
}

export default connect(mapStateToProps)(MonthWeek);
