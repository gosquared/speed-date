var makeFormatter = require('./makeFormatter');

function defaultFormat(utc) {
  return utc ? 'YYYY-MM-DDTHH:mm:ss[Z]' : 'YYYY-MM-DDTHH:mm:ssZ';
}

function makeSpeedDate(utc) {
  function speedDate(fmt, date) {
    if (!fmt) fmt = defaultFormat(utc);

    var formatter = makeFormatter(fmt, null, utc);

    if (typeof date === 'undefined') {
      return formatter;
    } else {
      return formatter(date);
    }
  }

  var formatterCache = {};

  speedDate.cached = function (fmt, date) {
    if (!fmt) fmt = defaultFormat(utc);

    var formatter = formatterCache[fmt];

    if (formatter === undefined) {
      formatter = formatterCache[fmt] = makeFormatter(fmt, null, utc);
    }

    if (typeof date === 'undefined') {
      return formatter;
    } else {
      return formatter(date);
    }
  };

  return speedDate;
}

module.exports = makeSpeedDate(false);
module.exports.UTC = makeSpeedDate(true);
