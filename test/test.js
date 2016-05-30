var assert = require('assert');
var moment = require('moment');
var speedDate = require('../index.js');


function check(d, fmt){
  d = new Date(+d);

  return function(){
    assert.strictEqual(speedDate.cached(fmt, d), moment(d).format(fmt));
  };
}

function checkUTC(d, fmt){
  d = new Date(+d);

  return function(){
    assert.strictEqual(speedDate.UTC.cached(fmt, d), moment.utc(d).format(fmt));
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
  'Qo',
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
  'Y',
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
  'k',
  'kk',
  'm',
  'mm',
  's',
  'ss',
  'S',
  'SS',
  'SSS',
  'SSSS',
  'SSSSS',
  'SSSSSS',
  'SSSSSSS',
  'SSSSSSSS',
  'SSSSSSSSS',
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
  '[today] dddd',
  'YYYYM', // make sure numeric tokens get concatenated rather than added
  'HHYYYYM',
  'SSSSSSSSSS',
  'SSSSSSSSSSSS',
  'SSSSSSSSSSSSSSSS' // some extra-long ones to make sure we get the max correct
];

// tokens = [ undefined ];

tokens.forEach(function(token){
  describe(token, function(){
    var d = new Date(0);
    while(d.getFullYear() < 2050){
      it(token + ' on ' + d.toISOString(), check(d, token));
      d = new Date(+d+8328427867);
    }
  });

  describe(token + ' UTC', function(){
    var d = new Date(0);
    while(d.getFullYear() < 2050){
      it(token + ' on ' + d.toISOString(), checkUTC(d, token));
      d = new Date(+d+8328427867);
    }
  });
});
