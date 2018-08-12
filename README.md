# MusicNet_Display
This repository provides the application for the display component of MusicNet

## Getting Started
```
    $ git clone https://github.com/JonasLenny/MusicNet_Display.git
    $ cd MusicNet_Display
```


## Prerequisites
* [Node.js](https://nodejs.org/en/) (>= 8.0.0)

## Installing
```
    $ npm install
```

## Usage
You have several options on how to use this application.

```
    // production
    // bundles all js files into one packed file (uglified, no source map).
    // debug: only in a crude way, code not readable.
    // output: /build/prod/
    $ npm run build:prod

    // development
    // bundles all js files into one packed file (not uglified, source map).
    // debug: possible, code is readable.
    // output: /build/dev/
    $ npm run build:dev

    // live development
    // bundles all js files into one packed file (not uglified, source map)
    // runs a dev-server which rebuilds/reloads the application automatically after changes.
    // debug: best way, code is readable.
    // output: /build/dev/ (dev-server keeps code in-memory)
    $ npm run server:dev
```

## Folder structure
The structure based upon the flux structure but contains some
additional folders like *templates* or *webpack*.

```
/
├── bin/                // files to handle general operations (copy files, ...)
├── build/              // the bundled app (dev, prod)
├── src/                // all files for the app
|   └── containers/     // contains the control-views
|   └── data/           // backend stuff
|   |   └── actions/    // actions and their types are defined here
|   |   └── assets/     // files which will be copied to the output (images, ...)
|   |   └── stores/     // here are the stores
|   |   └── templates/  // template files like the index.html
|   └── views/          // files with html content
├── test/               // all test files
├── webpack/            // the files for webpack
```

## Built with
* [React](https://github.com/facebook/react/) - License: MIT
* [Flux](https://github.com/facebook/flux) - License: BSD
* [Immutable](https://github.com/facebook/immutable-js/) - License: MIT
* [expressjs-generator](https://github.com/expressjs/generator) - License: MIT

## Open tasks


## License
[MIT](https://github.com/JonasLenny/MusicNet_Display/blob/develop/LICENSE)

## Contact
*how can someone get in contact with the project team.*
