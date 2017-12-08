import moment from 'moment'

/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns the date suffix for a given date.
 * e.g. "nth", "st", "nd", "rd", ect..
 *
 * @param {Number} day Day of the month
 * @returns {String} Ordinal for date suffixes
 */
const nth = (day) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
  case 1:  return `${day}st`;
  case 2:  return `${day}nd`;
  case 3:  return `${day}rd`;
  default: return `${day}th`;
  }
};

const isWeekend = () => {
    return (moment().format('dddd') === 'Saturday' || moment().format('dddd') === 'Sunday') ? true:false;
}

const currentMealFromDateTime = () => {
    if (!isWeekend) {
    switch (new Date().getHours()) {
        case 10:
        case 11:
        case 12:
        case 13:
            if (isWeekend) {
                return "Brunch"
            }
            return "Lunch";
            break;
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            return "Dinner";
            break;
        default:
            break;
    }
    }
};

const currentTime = () => {
    return moment().format('h:mm a');
};

const currentDate = () => {
    return moment().format('YYYY-MM-DD');
};

/**
 * Format a date to display as month and day
 * Accounts for daylight savings errors
 *
 * Example
 *
 * > dateString('2001-05-11');
 * 'May 11th'
 *
 * @param {String}  date        string representing a date
 * @param {Boolean} includeYear If true append year
 * @returns {String} Formatted date.
 */

const dateString = (date, includeYear = false) => {
  // Prevent daylight savings from interfering with date
  const normalizedDate = `${date}T12:30:30.30`;
  const dateObj = new Date(normalizedDate);

  // Get the month by local name
  const month = dateObj
      .toLocaleTimeString('en-us', {month: 'long'})
      .split(',')[0];

  const day = nth(dateObj.getDate());

  const optionalYear = includeYear
    ? `, ${dateObj.getFullYear()}`
    : '';

  return `${month} ${day}${optionalYear}`;
};

export default {
    dateString,
};
