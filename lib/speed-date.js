var makeFormatter = require('./makeFormatter');

function speedDate(fmt, date){

  if(fmt === undefined) fmt = 'YYYY-MM-DDTHH:mm:ssZ';

  var formatter = makeFormatter(fmt);

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
    formatter = formatterCache[fmt] = makeFormatter(fmt);
  }

  if(typeof date === 'undefined'){
    return formatter;
  }else{
    return formatter(date);
  }
};


module.exports = speedDate;
