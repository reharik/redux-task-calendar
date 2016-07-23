import { connect } from 'react-redux'
import Month from './../components/Month'
import Calendar from 'node-calendar'
import {amendTasks} from './../utils/calendarUtils'

function mapStateToProps(state) {
    var weeks = new Calendar
        .Calendar(Calendar.SUNDAY)
        .monthdatescalendar(state.selectedDay.year(), state.selectedDay.month() + 1);
    return {
        weeks
    }
}

export default connect(mapStateToProps)(Month);
