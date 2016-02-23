[![Dependency Status](https://gemnasium.com/0db53ebaf3c864005ee0428721722533.svg)](https://gemnasium.com/41e4f37c13ec5162446fae4a8d548cfc)


<img height="28" width="42" src="https://maven.apache.org/images/maven-logo-black-on-white.png"> [![POM Status](https://www.versioneye.com/user/projects/55aed6fb386562001800004d/badge.svg?style=flat&label=POM)]
(https://www.versioneye.com/user/projects/55aed6fb386562001800004d?child=summary#dialog_dependency_badge)

<img height="28" width="28" src="https://www.npmjs.com/static/images/touch-icons/favicon-32x32.png"> [![NPM Status](https://www.versioneye.com/user/projects/55aed5e83865620018000024/badge.svg?style=flat&label=NPM)]
(https://www.versioneye.com/user/projects/55aed5e83865620018000024?child=summary#dialog_dependency_badge)

<img height="28" width="28" src="http://bower.io/img/bower-logo.png"> [![BOWER Status](https://www.versioneye.com/user/projects/55aed7fd386562001700005a/badge.svg?style=flat&label=BOWER)]
(https://www.versioneye.com/user/projects/55aed7fd386562001700005a?child=summary#dialog_dependency_badge)


# Modulo client module

This module holds all web resources that make the client application of spring.io:

* JavaScript modules
* CSS styles
* images and fonts
* front-end dependencies

This module is using several tools for its own build system:

* [node.js and npm](http://nodejs.org)
* [Cram](https://github.com/cujojs/cram)
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

## Build requirements

You'll need a 0.10.x version of [node.js](http://nodejs.org) installed on your system.
Usage of the [Node Version Manager (nvm)](https://github.com/creationix/nvm) is perfectly fine.

## Making changes in modulo-client

When running the application with:

```
$ gradle :modulo-server-front:bootRun
```

Resources in modulo-client are served directly from the modulo-client module, so you can develop against the
unoptimized version of the client.

## Details about the JavaScript build

If you want to know more about the JavaScript build, this chapter will help you; reading this is not required.

The JavaScript application can be built manually with (the build result is located in the `dist` folder):

```
$ npm run build
```

### Node.js and npm

npm is the node package manager; it installs required dependencies in the `node_modules` directory.
Check the `package.json` file to find:

- all dependencies and their versions in `devDependencies`
- all available `scripts` that you can run with `npm run scriptname`

Note: we make extensive use of npm scripts so you don't have to install binaries globally on your system's PATH.
npm dynamically adds binaries listed in `node_modules/.bin` to its own PATH.

### Cram

[Cram](https://github.com/cujojs/cram) assembles JavaScript resources into bundles. Cram does not take care of the
optimizing phase. Cram is run by the [gulp-cram](https://github.com/bclozel/gulp-cram) plugin, as part of the
gulp build.

### Bower

Bower installs front-end dependencies like jquery or twitter bootstrap into`src/lib`.
That way, developers don't have to copy/paste/commit those resources manually.
All dependencies and their versions are listed in `bower.json`; we're also defining overrides in order to specify
which resources we want to retain when packaging for production (we certainly don't want to add hundreds of files
that have no use in our application). Those overrides are used by the
[gulp-bower-src](https://github.com/bclozel/gulp-bower-src) during the gulp build.

### Gulp

Gulp is the build system we're using to make things work together.
We've defined all tasks in our `gulpfile.js` file.
In this build, we're using dependencies that were downloaded by npm and we're concatenating/optimizing/packaging
resources that make our client application.