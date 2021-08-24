<h1 align="center"><pre>ϟ speed-date</pre></h1>
<p align="center"><strong>A super-fast JavaScript date formatter.</strong></p>
<p align="center">
    <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/speed-date">
        <img src="https://img.shields.io/npm/v/speed-date?color=CB3837&style=flat-square">
    </a>
    <a target="_blank" rel="noopener" href="https://travis-ci.org/gosquared/speed-date">
        <img src="https://img.shields.io/travis/gosquared/speed-date?style=flat-square">
    </a>
    <a target="_blank" rel="noopener" href="https://www.npmjs.com/package/speed-date?activeTab=versions">
        <img src="https://img.shields.io/npm/dm/speed-date.svg?style=flat-square">
    </a>
    <a href="https://github.com/gosquared/speed-date/issues">
        <img src="https://img.shields.io/github/issues/gosquared/speed-date.svg?style=flat-square">
    </a>
    <a href="https://github.com/gosquared/speed-date/commits">
        <img src="https://img.shields.io/github/last-commit/gosquared/speed-date.svg?style=flat-square">
    </a>
</p>
<br>

So you have a date object in JavaScript, and you want to turn it into a string? Perhaps you want to format it a particular way, say `YYYY-MM-DD HH:mm:ss`.

**`ϟ speed-date`** is a super-fast date formatter optimized for formatting _lots_ of dates with the same format.

## 💿 Installation

<a target="_blank" rel="noopener" href="https://www.npmjs.com/package/speed-date">
    <img src="https://nodei.co/npm/speed-date.png">
</a>

```bash
npm i speed-date
# or
yarn add speed-date
```

## ✨ Usage

```javascript
const speedDate = require('speed-date');

const date = new Date(2006, 1, 3, 12, 34, 56);
const formatter = speedDate('YYYY-MM-DD HH:mm:ss');

formatter(date); // '2006-02-03 12:34:56'

// without creating a formatter
speedDate('YYYY-MM-DD HH:mm:ss', date); // '2006-02-03 12:34:56'

// with caching for faster formatting
speedDate.cached('YYYY-MM-DD HH:mm:ss', date); // '2006-02-03 12:34:56'
```

## 🛠 Full API

### `speedDate(format[, date])`

When called with just `format`, generates a formatter function that takes date objects.

When called with both `format` and `date`, creates a formatter function and applies it with the given date.

### `speedDate.cached(format[, date])`

Behaves the same as `speedDate`, but the generated formatter function is stored and reused if the same `format` is used again. Only use this if you know you're only going to be using a few different possible formats (they're never cleaned up internally).

### `speedDate.UTC(format[, date])`

Exactly the same as above, but always interprets the date as UTC. Obviousy, in this mode, `Z` and `ZZ` tokens will always be `+00:00` and `+0000` respectively. Similarly `speedDate.UTC.cached(format[, date])`.

## 🤔 Frequently asked questions

### But how fast is it actually?

Well, run `npm run benchmark` to find out for yourself how it stacks up against Moment for various formatting tokens. On the whole speed-date is ~15-20x faster than Moment with repeated use of the same formatter function. Check out [benchmark results](benchmark/results.txt) for an example run.

### Is there any error handling or input validation?

Nope. None at all. In the interests of performance, speed-date assumes that you're always passing in valid Date objects and sane formatting strings. If you give it an invalid Date, it won't handle it nicely, like how Moment returns "Invalid date". It'll probably return something with `NaN` and `undefined` all over the place. If you give it something that isn't a Date object at all, there's no telling what it'll do. It might return complete garbage, it might throw an error, it might set fire to your dog. So be careful.

## 📰 License

> The **speed-date** project is released under the [ISC license](https://github.com/gosquared/speed-date/blob/main/LICENSE.md).
