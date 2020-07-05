[![GitHub license](https://img.shields.io/github/license/AndTheGodsMadeLove/vjs.svg)](https://github.com/AndTheGodsMadeLove/vjs/blob/master/LICENSE) [![GitHub tag](https://img.shields.io/github/tag/AndTheGodsMadeLove/vjs.svg)](https://GitHub.com/AndTheGodsMadeLove/vjs/tags/) ![GitHub commits](https://img.shields.io/github/commits-since/AndTheGodsMadeLove/vjs/v0.1-alpha.svg) [![GitHub contributors](https://img.shields.io/github/contributors/AndTheGodsMadeLove/vjs.svg)](https://GitHub.com/AndTheGodsMadeLove/vjs/graphs/contributors/) [![Github all releases](https://img.shields.io/github/downloads/AndTheGodsMadeLove/vjs/total.svg)](https://GitHub.com/AndTheGodsMadeLove/vjs/releases/)

# VJS
VJS aims to be a lightweight framework for native web components which can be utilized to create SPA without almost any effort. Feel free to contribute in any way, your input is highly welcome! :thumbsup:

**The project itself is in the very beginning of the development process and almost everything is missing at this point.** :thumbsdown:

## Table of Contents
- [Getting started with VJS](#getting-started-with-vjs)
  - [setup project folder](#setup-project-folder)
  - [initialize VJS Router](#initialize-vjs-router)
- [Documentation](#documentation)
  - [Router](#router)
    - [Router](#router-router)
      - [Properties](#router-router-properties)
      - [Methods](#router-router-methods)
      - [Events](#router-router-events)
    - [Resolver](#router-resolver)
      - [Properties](#router-resolver-properties)
      - [Methods](#router-resolver-methods)
      - [Events](#router-resolver-events)
    - [View](#router-view)
      - [Properties](#router-view-properties)
      - [Methods](#router-view-methods)
      - [Events](#router-view-events)
    - [Location](#router-location)
- [ToDo](#todo)
  - finish readme
  - create changelog
  - implement log level
  - add type definition for lifecycle method parameters
  - implement redirects
  - implement animated transitions
  - add the option to pass a callback to routes which will be invoked when the view component finished its rendering process
  - lazy loading
  - error handling
  - test in firefox and safari
## Getting started with VJS
#### setup project folder
Create your own project folder and copy the VJS source to your desired location inside your project. The demo application utilizes following folder structure:
```
project-folder
└───js
│   └───component
|   └───view
│   └───vendor
|   |   └───vjs
|   |
|   |   app.js
|
|   index.html
```
The source of VJS will be placed inside the `js/vendor/vjs` directory.
#### initialize VJS Router
> A router is a key component in most frontend frameworks. It is the piece of software in charge to organize the states of the application and switching between different views.

Prepare the `index.html`:
```markup
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VJS SPA</title>
    <script type="module" src="js/app.js"></script>
    <style>a { display: block; }</style>
</head>
<body>
    <a href="/">landing page</a>
    <a href="/log">log list page</a>
    <a href="/log/12">log detail page</a>
    <a href="/log/12/edit">edit log detail page</a>

    <div id="app"></div>
</body>
</html>
```
Initialize the router inside your entry point:
```javascript
// #js/app.js

// import Router
import { Router }       from './vendor/vjs/router/router.js';
// import custom elements used as ViewComponents
import { LandingPage }  from './component/landing-page/landing-page.js';
import { LogList }      from './component/log-list/log-list.js';
import { LogDetail }    from './component/log-detail/log-detail.js';
import { ErrorPage }    from './component/error-page/error-page.js';

const options = {
  // HTMLElement used as surface
  container: document.querySelector('#app'),
  // array with routes
  routes: [
    // path       contains the express.js-syntax string for the route
    // component  contains the HTMLTag of the custom element which should
    //            be displayed in the surface if the url matches the route
    { path: '/', component: 'landing-page' },
    { path: '/log', component: 'log-list' },
    { path: '/log/:id/:mode?', component: 'log-detail' },
    { path: '.*', component: 'error-page' },
  ],
  // HTMLElement to perform an anchor scan on. (adds eventListener to all
  // HTMLAnchorElements and uses its href property as path
  anchorScan: document.querySelector('body'),
};

// initiate router with options
const router = new Router(options);
// navigate to landing page
router.goTo('/');
```
Your first VJS application in its simplest form is up and running. Take a look into the documentation to learn more about the router, configuration and all its **magic**.

## Documentation
TBD
