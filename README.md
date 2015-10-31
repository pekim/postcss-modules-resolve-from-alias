# CSS Modules: Extract Imports

[![Build Status](https://travis-ci.org/pekim/postcss-modules-resolve-from-alias.svg?branch=master)](https://travis-ci.org/pekim/postcss-modules-resolve-from-alias)

With this config:

```javascript
{
  'css': 'src/style'
}
```

transforms:

```css
.myClass {
  composes: button from "css/button.css";
  color: green;
}
```

into:

```css
.myClass {
  composes: button from "src/style/button.css";
  color: green;
}
```

## Options

An object, where each key/value pair represents an alias for `composes` import paths.
- _key_ - `composes` import path prefix
- _value_ - replacement value for the import path prefix

Both keys and values may include a trailing `/`.
If there is no trailing `/`, then one is implied.

## Building

```
npm install
npm build
npm test
```

[![Build Status](https://travis-ci.org/pekim/postcss-modules-resolve-from-alias.svg?branch=master)](https://travis-ci.org/pekim/postcss-modules-resolve-from-alias)

* Lines: [![Coverage Status](https://coveralls.io/repos/pekim/postcss-modules-resolve-from-alias/badge.svg?branch=master)](https://coveralls.io/r/pekim/postcss-modules-resolve-from-alias?branch=master)
* Statements: [![codecov.io](http://codecov.io/github/pekim/postcss-modules-resolve-from-alias/coverage.svg?branch=master)](http://codecov.io/github/pekim/postcss-modules-resolve-from-alias?branch=master)

## Development

- `npm watch` will watch `src` for changes and rebuild
- `npm autotest` will watch `src` and `test` for changes and retest

## License

MIT
