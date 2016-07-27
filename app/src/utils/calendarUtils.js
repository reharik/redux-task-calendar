import Calendar from 'node-calendar';
import moment from 'moment';
import invariant from 'invariant';

const validateTask = task => {
  invariant(task.startTime, `Tasks must have a start time! startTime: ${task.startTime}`);
  invariant(task.endTime, `Tasks must have a end time! endTime: ${task.endTime}`);
};

const momentFromTime = function(time) {
  return moment.isMoment(time) ? time.clone() : moment(time, ['h:mm A']);
};

const normalizeTasks = function(tasks, config) {

  return tasks.map(t => {
    validateTask(t);
    const endTime = momentFromTime(t.endTime);
    const startTime = momentFromTime(t.startTime);
    const date = t.date ? moment(t.date) : moment(startTime);
    const inc = config && config.increments ? config.increments : 15;
    const slots = endTime.diff(startTime, 'minutes') / inc;
    const display = config && config.display && typeof config.display === 'function' ? config.display(t) : t.display;
    const title = t.title || t.startTime;
    return {
      date,
      startTime,
      endTime,
      slots,
      display,
      title,
      editable: t.editable || true,
      id: t.id,
      color: t.color, // || config.defaultColor,
      titleColor: t.titleColor, // || config.defaultTitleColor,
      orig: t,
      x: t.x
    };
  });
};

const getWeek = function(day) {
  const calendar = new Calendar.Calendar(Calendar.SUNDAY);
  const week = calendar.monthdatescalendar(day.year(), day.month() + 1)
    .filter(_week => _week.some(date => moment(date).isSame(day, 'day')));
  return week.length > 0 ? week[0].map(x=>moment(x)) : [];
};

const formatHeaderDisplay = function(mom, viewType) {
  if (viewType === 'day') {
    return mom.format('MMMM') + ' ' + mom.date() + ', ' + mom.year();
  } else if (viewType === 'week') {
    const displayedWeek = getWeek(mom);
    return displayedWeek[0].format('MMMM Do') + ' - ' + displayedWeek[6].format('MMMM Do');
  }
  return mom.format('MMMM') + ' ' + mom.year();
};

const getTimesForDay = function(config) {
  let result = [];
  let time = config.dayStartsAt.clone();
  const end = config.dayEndsAt;
  while (time.isBefore(end, 'minutes', '[)')) {
    result.push(time.format('h:mm A'));
    time.add(config.increment, 'minutes');
  }
  return result;
};

const augmentTimes = (config, classes, day) => {
  return getTimesForDay(config).map(time => {
    const isHour = time.indexOf(':00') > -1;
    classes = isHour ? classes + 'hour__breaks' : classes;
    return {time, isHour, classes, display: isHour ? time : ' ', day};
  });
};

export {
    formatHeaderDisplay,
    normalizeTasks,
    momentFromTime,
    augmentTimes,
    getWeek
};
