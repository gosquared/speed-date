# speed-date

[![Travis](https://api.travis-ci.org/gosquared/speed-date.svg)](https://travis-ci.org/gosquared/speed-date)
[![Dependencies](https://david-dm.org/gosquared/speed-date.svg)](https://david-dm.org/gosquared/speed-date)
[![Join the chat at https://gitter.im/gosquared/speed-date](https://img.shields.io/badge/gitter-join%20chat-blue.svg)](https://gitter.im/gosquared/speed-date)

[![NPM](https://nodei.co/npm/speed-date.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/speed-date)

### Format your dates really really fast

So you have a date object in JavaScript. And you want to turn it into a string. Perhaps you want to format it a particular way, say `YYYY-MM-DD HH:mm:ss`.

Speed-date is a super-fast date formatter optimized for formatting _lots_ of dates with the same format.

## Installation

```sh
npm install speed-date
```

## Usage

```js
var speedDate = require('speed-date');

var theDate = new Date(2006, 1, 3, 12, 34, 56);

var formatter = speedDate('YYYY-MM-DD HH:mm:ss');

formatter(theDate); // '2006-02-03 12:34:56'


// alternatively:
speedDate('YYYY-MM-DD HH:mm:ss', theDate); // '2006-02-03 12:34:56'

// alternatively alternatively:
// faster when repeated lots with the same format,
// useful as an alternative to keeping track of formatter as above
speedDate.cached('YYYY-MM-DD HH:mm:ss', theDate); // '2006-02-03 12:34:56'
```

## Full API

### **speedDate(format[, date])**

When called with just `format`, generates a formatter function that takes date objects.

When called with both `format` and `date`, creates a formatter function and applies it with the given date.

### **speedDate.cached(format[, date])**

Behaves the same as `speedDate`, but the generated formatter function is stored and reused if the same `format` is used again. Only use this if you know you're only going to be using a few different possible formats (they're never cleaned up internally).

### **speedDate.UTC(format[, date])**

Exactly the same as above, but always interprets the date as UTC. Obviousy, in this mode, `Z` and `ZZ` tokens will always be `+00:00` and `+0000` respectively. Similarly `speedDate.UTC.cached(format[, date])`.

## But how fast is it actually?

Well, run `npm run benchmark` to find out for yourself how it stacks up against Moment for various formatting tokens. On the whole speed-date is ~15-20x faster than Moment with repeated use of the same formatter function. Check out [benchmark results](benchmark/results.txt) for an example run.

## Is there any error handling or input validation?

Nope. None at all. In the interests of performance, speed-date assumes that you're always passing in valid Date objects and sane formatting strings. If you give it an invalid Date, it won't handle it nicely, like how Moment returns "Invalid date". It'll probably return something with `NaN` and `undefined` all over the place. If you give it something that isn't a Date object at all, there's no telling what it'll do. It might return complete garbage, it might throw an error, it might set fire to your dog. So be careful.
