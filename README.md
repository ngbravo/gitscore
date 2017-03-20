# Github Scoring Chrome Extension

[![Build Status](https://travis-ci.org/ngbravo/gitscore.svg?branch=master)](https://travis-ci.org/ngbravo/gitscore)

> Chrome Extension that gives a repository a score based on its health, activity, and growth.

## Getting Started

```sh
# Watch through webpack to update source continuously
gulp serve

# Make a production version extension
gulp build

# Run all tests
npm test
```

## Test Chrome Extension

To test, go to: chrome://extensions, enable Developer mode and load app as an unpacked extension.

Need more information about Chrome Extension? Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html)


## gulp tasks

### Build

Builds the extension through webpack, you can manage build configuration in webpack.dev.js or webpack.prod.js.

```bash

# Make a production version extension on dist folder
gulp build

# Make a development version extension on temo folder
gulp build:dev

```

### Build and Package

Run this command to build the gitscore Extension.

```bash
gulp build
```

You can also distribute the compressed file using the Chrome Developer Dashboard at Chrome Web Store. This command will compress your app built by `gulp build` command.

```bash
gulp package
```

## Contributing

Just send a Pull Request and we will review it. Make sure it tackles an Issue. If it doesn't, create the Issue first.
