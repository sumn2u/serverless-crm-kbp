import * as moment from 'moment';

export function happenedBefore(momentDate, minutesAgo) {
  return momentDate.add(minutesAgo, 'minutes').calendar()  < moment().calendar();
}