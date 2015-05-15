# speed-date

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


## But how fast is it actually?

Well, run `npm run benchmark` to find out for yourself how it stacks up against Moment for various formatting tokens. On the whole speed-date is ~15-20x faster than Moment with repeated use of the same formatter function. Check out [benchmark results](benchmark/results.txt) for an example run.
