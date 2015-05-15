
function makeFormatter(str, locale){

  var bits = [];

  var gets = {};

  if(!locale) locale = {};
  var localeWeek = locale.week || { dow: 0, doy: 6 };


  function add(wat){ bits.push(wat); }
  function nxt(n){ str = str.slice(n); }

  while(str.length){
    switch(str.charAt(0)){
    case 'M':
      gets.month = true;
      if(/^MMMM/.test(str)){
        add('["January","February","March","April","May","June","July","August","September","October","November","December"][_month]');
        nxt(4); continue;
      }
      if(/^MMM/.test(str)){
        add('["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][_month]');
        nxt(3); continue;
      }
      if(/^MM/.test(str)){
        add('_month+1 < 10 ? "0" : ""');
        add('_month+1');
        nxt(2); continue;
      }
      if(/^Mo/.test(str)){
        add('_month+1');
        add('_month < 3 ? ["st","nd","rd"][_month] : "th"');
        nxt(2); continue;
      }

      add('_month + 1');
      nxt(1); continue;

    case 'Q':
      gets.month = true;
      add('Math.ceil((_month + 1) / 3)');
      nxt(1); continue;

    case 'D':
      if(/^DDD/.test(str)){
        gets.dayOfYear = true;
        if(/^DDDD/.test(str)){
          add('_doy < 100 ? "0" : ""');
          add('_doy < 10 ? "0" : ""');
          add('_doy');
          nxt(4); continue;
        }
        if(/^DDDo/.test(str)){
          add('_doy');
          add(
            '(_doy%100) === 11 || (_doy%100) === 12 || (_doy%100) === 13 || ((_doy-1) % 10) > 2 ? "th" : ' +
            '["st","nd","rd"][(_doy-1)%10]'
          );
          nxt(4); continue;
        }

        add('_doy');
        nxt(3); continue;

      }

      gets.date = true;
      if(/^DD/.test(str)){
        add('_date < 10 ? "0" : ""');
        add('_date');
        nxt(2); continue;
      }

      if(/^Do/.test(str)){
        add('_date');
        add(
          '_date === 11 || _date === 12 || _date === 13 || ((_date-1) % 10) > 2 ? "th" : ' +
          '["st","nd","rd"][(_date-1)%10]'
        );
        nxt(2); continue;
      }

      add('_date');
      nxt(1); continue;

    case 'd':
      gets.day = true;
      if(/^dddd/.test(str)){
        add('["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][_day]');
        nxt(4); continue;
      }

      if(/^ddd/.test(str)){
        add('["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][_day]');
        nxt(3); continue;
      }

      if(/^dd/.test(str)){
        add('["Su","Mo","Tu","We","Th","Fr","Sa"][_day]');
        nxt(2); continue;
      }

      if(/^do/.test(str)){
        add('_day');
        add('_day === 1 ? "st" : _day === 2 ? "nd" : _day === 3 ? "rd" : "th"');
        nxt(2); continue;
      }

      add('_day');
      nxt(1); continue;

    case 'e':
      gets.day = true;
      add('(_day + 7 - ' + (+localeWeek.dow) + ') % 7');
      nxt(1); continue;

    case 'E':
      gets.day = true;
      add('_day === 0 ? 7 : _day');
      nxt(1); continue;

    case 'w':
      gets.week = true;
      if(/^ww/.test(str)){
        add('_week < 10 ? "0" : ""');
        add('_week');
        nxt(2); continue;
      }

      if(/^wo/.test(str)){
        add('_week');
        add(
          '_week === 11 || _week === 12 || _week === 13 || ((_week-1) % 10) > 2 ? "th" : ' +
          '["st","nd","rd"][(_week-1)%10]'
        );
        nxt(2); continue;
      }

      add('_week');
      nxt(1); continue;

    case 'W':
      gets.isoweek = true;
      if(/^WW/.test(str)){
        add('_i_week < 10 ? "0" : ""');
        add('_i_week');
        nxt(2); continue;
      }

      if(/^Wo/.test(str)){
        add('_i_week');
        add(
          '_i_week === 11 || _i_week === 12 || _i_week === 13 || ((_i_week-1) % 10) > 2 ? "th" : ' +
          '["st","nd","rd"][(_i_week-1)%10]'
        );
        nxt(2); continue;
      }

      add('_i_week');
      nxt(1); continue;

    case 'Y':
      gets.year = true;
      if(/^YYYY/.test(str)){
        add('_year');
        nxt(4); continue;
      }

      if(/^YY/.test(str)){
        add('_year % 100');
        nxt(2); continue;
      }

      break;

    case 'g':
      gets.week = true;
      if(/^gggg/.test(str)){
        add('_weekYear');
        nxt(4); continue;
      }

      if(/^gg/.test(str)){
        add('_weekYear % 100');
        nxt(2); continue;
      }

      break;

    case 'G':
      gets.isoweek = true;
      if(/^GGGG/.test(str)){
        add('_i_weekYear');
        nxt(4); continue;
      }

      if(/^GG/.test(str)){
        add('_i_weekYear % 100');
        nxt(2); continue;
      }

      break;

    case 'A':
      gets.hour = true;
      add('_hour > 11 ? "PM" : "AM"');
      nxt(1); continue;

    case 'a':
      gets.hour = true;
      add('_hour > 11 ? "pm" : "am"');
      nxt(1); continue;

    case 'H':
      gets.hour = true;
      if(/^HH/.test(str)){
        add('_hour < 10 ? "0" : ""');
        add('_hour');
        nxt(2); continue;
      }

      add('_hour');
      nxt(1); continue;

    case 'h':
      gets.hour = true;
      if(/^hh/.test(str)){
        add('((_hour+11) % 12) < 9 ? "0" : ""');
        add('((_hour+11) % 12) + 1');
        nxt(2); continue;
      }

      add('((_hour+11) % 12) + 1');
      nxt(1); continue;

    case 'm':
      gets.minutes = true;
      if(/^mm/.test(str)){
        add('_mins < 10 ? "0" : ""');
        add('_mins');
        nxt(2); continue;
      }

      add('_mins');
      nxt(1); continue;

    case 's':
      gets.seconds = true;
      if(/^ss/.test(str)){
        add('_secs < 10 ? "0" : ""');
        add('_secs');
        nxt(2); continue;
      }

      add('_secs');
      nxt(1); continue;

    case 'S':
      gets.millis = true;
      if(/^SSS/.test(str)){
        add('_ms');
        nxt(3); continue;
      }

      if(/^SS/.test(str)){
        add('Math.floor(_ms/10)');
        nxt(2); continue;
      }

      add('Math.floor(_ms / 100)');
      nxt(1); continue;

    case 'Z':
      gets.offset = true;
      if(/^ZZ/.test(str)){
        add('_offs >= 0 ? "+" : "-"');
        add('_offH < 10 ? "0" : ""');
        add('_offH');
        add('_offM < 10 ? "0" : ""');
        add('_offM');
        nxt(2); continue;
      }


      add('_offs >= 0 ? "+" : "-"');
      add('_offH < 10 ? "0" : ""');
      add('_offH');
      add('":"');
      add('_offM < 10 ? "0" : ""');
      add('_offM');
      nxt(1); continue;

    case 'X':
      add('Math.floor(d / 1000)');
      nxt(1); continue;

    case 'x':
      add('d.valueOf()');
      nxt(1); continue;

    case 'L':
      throw "TODO";
    case 'l':
      throw "TODO";

    case '[':
      var idx = str.indexOf(']');
      if(idx === -1){
        add('"["');
        nxt(1); continue;
      }

      add(JSON.stringify(str.slice(1, idx)));
      nxt(idx+1);
      continue;
    }

    add(JSON.stringify(str.charAt(0)));
    nxt(1);
  }


  var fnBody = '';

  Object.keys(gets).forEach(function(k){
    fnBody += {
      'date': 'var _date = d.getDate();',

      'month': 'var _month = d.getMonth();',

      'dayOfYear': [
        'var _startOfYear = new Date(d.valueOf());',
        '_startOfYear.setMonth(0);',
        '_startOfYear.setDate(1);',
        'var _doy = Math.round((d - _startOfYear) / 864e5) + 1;'
      ].join('\n'),

      'day': 'var _day = d.getDay();',

      'year': 'var _year = d.getFullYear();',

      'hour': 'var _hour = d.getHours();',

      'minutes': 'var _mins = d.getMinutes();',

      'seconds': 'var _secs = d.getSeconds();',

      'millis': 'var _ms = d.getMilliseconds();',

      'offset': [
        'var _offs = -d.getTimezoneOffset();',
        'var _absOffs = _offs < 0 ? -_offs : _offs;',
        'var _offH = Math.floor(_absOffs / 60);',
        'var _offM = _absOffs % 60;'
      ].join('\n'),

      'week': [ // mostly taken from moment, probably not as efficient as it could be
        'var _wend = ' + (localeWeek.doy - localeWeek.dow) + ';',
        'var _ddw = ' + (+localeWeek.doy) + ' - d.getDay();',
        'if(_ddw > _wend) _ddw -= 7;',
        'if(_ddw < _wend - 7) _ddw += 7;',
        'var _d2 = new Date(d.valueOf());',
        '_d2.setDate(d.getDate() + _ddw);',
        'var _soy2 = new Date(_d2.valueOf());',
        '_soy2.setMonth(0);',
        '_soy2.setDate(1);',
        'var _doy2 = Math.round((_d2 - _soy2) / 864e5) + 1;',
        'var _week = Math.ceil(_doy2 / 7);',
        'var _weekYear = _d2.getFullYear();'
      ].join('\n'),

      'isoweek': [ // mostly taken from moment, probably not as efficient as it could be
        'var _i_wend = 3;',
        'var _i_ddw = 4 - d.getDay();',
        'if(_i_ddw > _i_wend) _i_ddw -= 7;',
        'if(_i_ddw < _i_wend - 7) _i_ddw += 7;',
        'var _i_d2 = new Date(d.valueOf());',
        '_i_d2.setDate(d.getDate() + _i_ddw);',
        'var _i_soy2 = new Date(_i_d2.valueOf());',
        '_i_soy2.setMonth(0);',
        '_i_soy2.setDate(1);',
        'var _i_doy2 = Math.round((_i_d2 - _i_soy2) / 864e5) + 1;',
        'var _i_week = Math.ceil(_i_doy2 / 7);',
        'var _i_weekYear = _i_d2.getFullYear();'
      ].join('\n')
    }[k] + '\n';
  });

  fnBody += 'return (\n' +
    bits.map(function(x){ return '(' + x + ')'; }).join(' + \n') +
    '\n);';

  return new Function('d', fnBody);
}

module.exports = makeFormatter;
