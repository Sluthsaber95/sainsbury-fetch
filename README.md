# Sainsbury's NASA Technical Test

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them. Use the exact runtimes and package managers below - other version may yield unexpected results

```
Node: 10.14.2

NPM: 6.5.0

Yarn: 1.10.1
```

### Installing
This project only utlizes `Yarn` and has not been tested for `NPM` - i.e. there is currently no `package-lock.json` file only `yarn.lock`, thus using NPM may yield unexpected results.

NPM is shown here so that you can use NPM to install [Yarn](https://yarnpkg.com/en/docs/getting-started), or install Yarn by itself. Please note here that this version of NPM comes by default with 10.14.2 NodeJS

```
yarn install
```
### Straight to Live Version
Built & Hosted on Netlify - https://happy-darwin-774cee.netlify.com/search

### Start up the project

```
yarn start
```

You should see this terminal message like so.
```
Compiled successfully!

You can now view booking-go-assignment in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.10:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

<br/>


## Running the tests

## Static Type Testing - Flow
Unfortunately Flow can't run on watch due to how slow my current machine is. The alternative solution is introduce a simple CML via Yarn

```
yarn run flow:quick-check
```

### Unit Tests - TDD with Jest & Enzyme

To unit test all components
```
yarn test
```

You should get this message
```
No tests found related to files changed since last commionit.
Press `a` to run all tests, or run Jest with `--watchAlssignment$l`.

Watch Usage
 › Press a to run all tests.
 › Press p to filter by a filename regex pattern. › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

To unit test a specific component
```
yarn test <Component Name>.spec.js
```

```
yarn test CardResultValid.spec.js
```

<br/>

### End-to-end Tests - Cypress (automated UI testing)

#### Prerequisite

- Install the latest version of Chrome Browser

To start, type in the command below to start up the Cypress GUI
```
yarn run cypress:dev
```

The GUI will consist of 3 separate tests, I recommend just running all of them at once they should take under 3 minutes.

Unfortunately not all the tests here have been completed - in this case asset__spec--image

For some reason on pageload/renders on Cypress doesn't show the asset loading up properly. On the other hand the application loads the asset on route /asset/:id fine - need to shoot the Cypress team on Twitter on whether I'm using the tool correctly or if there is a potential bug in the tooling.

<br/>


## Build Project

```
yarn run build
```

## Extras
For additional notes, visit the /docs section in this project 
- Improvements to the project - see `/Notes On Project/What can I improve?.md`
- Technical Test Checklist - see `/Notes On Project/Technical Test Checklist.md`
- Agile Tickets - see `/Tickets`
