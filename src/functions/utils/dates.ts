import * as moment from 'moment';

export function happenedBeforeMoreThen(momentDate, minutesAgo) {
  return momentDate.add(minutesAgo, 'minutes')  < moment();
}