import { connect } from 'react-redux'
import  WeekDays  from './../components/WeekDays'
import { getWeek } from './../utils/calendarUtils'

function mapStateToProps(state) {
    return {
        week: getWeek(state.selectedDay)
    }
}

export default connect(mapStateToProps)(WeekDays);