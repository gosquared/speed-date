var makeFormatter = require('./makeFormatter');

function makeSpeedDate(utc) {
  function speedDate(fmt, date){

    if(!fmt) fmt = 'YYYY-MM-DDTHH:mm:ssZ';

    var formatter = makeFormatter(fmt, null, utc);

    if(typeof date === 'undefined'){
      return formatter;
    }else{
      return formatter(date);
    }
  }



  var formatterCache = {};

  speedDate.cached = function(fmt, date){

    if(!fmt) fmt = 'YYYY-MM-DDTHH:mm:ssZ';

    var formatter = formatterCache[fmt];

    if(formatter === undefined){
      formatter = formatterCache[fmt] = makeFormatter(fmt, null, utc);
    }

    if(typeof date === 'undefined'){
      return formatter;
    }else{
      return formatter(date);
    }
  };

  return speedDate;
}


module.exports = makeSpeedDate(false);
module.exports.UTC = makeSpeedDate(true);
