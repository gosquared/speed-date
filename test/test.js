var assert = require('assert');
var moment = require('moment');
var speedDate = require('../index.js');


function check(d, fmt){
  d = new Date(+d);

  return function(){
    assert.equal(speedDate.cached(fmt, d), moment(d).format(fmt));
  };
}

function checkUTC(d, fmt){
  d = new Date(+d);

  return function(){
    assert.equal(speedDate.UTC.cached(fmt, d), moment.utc(d).format(fmt));
  };
}

var tokens = [
  '',
  'M',
  'Mo',
  'MM',
  'MMM',
  'MMMM',
  'Q',
  'D',
  'Do',
  'DD',
  'DDD',
  'DDDo',
  'DDDD',
  'd',
  'do',
  'dd',
  'ddd',
  'dddd',
  'e',
  'E',
  'w',
  'wo',
  'ww',
  'W',
  'Wo',
  'WW',
  'YY',
  'YYYY',
  'gg',
  'gggg',
  'GG',
  'GGGG',
  'A',
  'a',
  'H',
  'HH',
  'h',
  'hh',
  'm',
  'mm',
  's',
  'ss',
  'S',
  'SS',
  'SSS',
  'Z',
  'ZZ',
  'X',
  'x',
  'LT',
  'LTS',
  'L',
  'l',
  'LL',
  'll',
  'LLL',
  'lll',
  'LLLL',
  'llll',
  undefined,
  '_',
  '$&"(£)"',
  '[hi]',
  '[hi',
  '[today] dddd'
];

// tokens = ['e'];

tokens.forEach(function(token){
  describe(token, function(){
    var d = new Date(0);
    while(d.getFullYear() < 2100){
      it('Agrees with moment for ' + token + ' on ' + d.toISOString(), check(d, token));
      d = new Date(+d+1328427867);
    }
  });

  describe(token + ' UTC', function(){
    var d = new Date(0);
    while(d.getFullYear() < 2100){
      it('Agrees with moment for ' + token + ' on ' + d.toISOString(), checkUTC(d, token));
      d = new Date(+d+1328427867);
    }
  });
});
