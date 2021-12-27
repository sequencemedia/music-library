# @sequencemedia/music-library

Parses an Apple Music `Library.xml` file and transforms it to [`m3u`](https://en.wikipedia.org/wiki/M3U) files, JSON, JavaScript, or EcmaScript.

The command line app can watch for changes to an Apple Music `Library.xml` file and write `m3u` files to a destination directory.

Or, the component functions can be imported into your own application. 

This packages implements [`@sequencemedia/music-library-parser`](https://github.com/sequencemedia/music-library-parser).

Requires [Java](https://www.oracle.com/java/technologies/javase-downloads.html) and [Saxon PE](https://www.saxonica.com/welcome/welcome.xml).

## Command line app

```
npm run start -- \
  --jar "/usr/local/bin/saxon/SaxonPE10-6J/saxon-pe-10.6.jar" \
  --xml "~/Music/Music/Library.xml" \
  --destination "~/Documents/Music Library"
```

Paths will differ on your device.

## Library

Transforms the entire library.

```javascript
import { toM3U } from './src/library/index.mjs'
import {
  toJSON,
  toJS,
  toES
 } from './src/library/transform/index.mjs'
```

### `toM3U`

Requires the arguments `jar`, `xml`, and `destination`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the Apple Music `Library.xml` file
- `destination` - the path for the `m3u` files to be written

Returns a `Promise` resolving when all `m3u` files are written.

### `toJSON`

Requires the arguments `jar`, and `xml`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the Apple Music `Library.xml` file

Returns a `Promise` resolving to a `JSON` string.

### `toJS`

Requires the arguments `jar`, and `xml`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the Apple Music `Library.xml` file

Returns a `Promise` resolving to a JavaScript object.

### `toES`

Requires the arguments `jar`, and `xml`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the Apple Music `Library.xml` file

Returns a `Promise` resolving to a collection of JavaScript `Map` and `Set` instances.

## Playlists

Transforms the playlists.

```javascript
import { toM3U } from './src/library/playlists/index.mjs'
import {
  toJSON,
  toJS,
  toES
 } from './src/library/playlists/transform/index.mjs'
```

See **Library**.

## Tracks

Transforms the tracks.

```javascript
import { toM3U } from './src/library/tracks/index.mjs'
import {
  toJSON,
  toJS,
  toES
 } from './src/library/tracks/transform/index.mjs'
```

See **Library**.
