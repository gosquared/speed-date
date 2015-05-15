var Benchmark = require('benchmark');
var moment = require('moment');
var speedDate = require('../index.js');


var tokens = [
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

// tokens = [ undefined ];

tokens.forEach(function(tkn){
  var suite = new Benchmark.Suite(String(tkn));

  console.log('Testing format: %s', tkn);

  suite.add('moment', function(){
    moment(new Date(Math.random() * 1000000000)).format(tkn);
  });

  suite.add('speed-date', function(){
    speedDate(tkn, new Date(Math.random() * 1000000000));
  });

  suite.add('speed-date (cached)', function(){
    speedDate.cached(tkn, new Date(Math.random() * 1000000000));
  });

  var fmt = speedDate(tkn);

  suite.add('speed-date (stored function)', function(){
    fmt(new Date(Math.random() * 1000000000));
  });

  suite.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name') + '\n');
  });

  suite.run();
});
