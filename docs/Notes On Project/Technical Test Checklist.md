# Technical Test Checklists 
Love checklists, inspired by anecdote from Freakonimics where infections rates in an American hospital had been reduced on invasive surgeries requiring an incision was reduced from 11% to 0% - you can't get any lower than zero

The below are the Technical specifications requires for this test to be completed to the highest quality; checklists are based on Front-End-Test given to me

## Brief
* [x] Develop a web application that integrates with the NASA Image and Video Library API
  - Used create-react-app and tools built around that environment, to easily jumpstart the project
* [x] It should allow users to search for assets and then select and view an asset.
  - Assets that can searched for are Images and Audio
  - Unfortunately I was unable to make the app persistant to retrieve audio data - i.e. it disappears upon refresh

##  Wireframes
* [x] We encourage you to go above and beyond what is presented, demonstrating your UX/UI as well as coding skills:
  - I learnt a valuable lesson not to create things from scratch, for lack of better term bespokely. So Material UI was used here to save time
  - Uses the 12 Point Grid system - mainly used for all modern websites of all viewport sizes (except smart watches)

## Tools, libraries and frameworks
* [x] The choice of tools, libraries and frameworks used to develop the application is left open 
  - Currently specialise more around React ecosystem, such as Cypress, create-react-app, Material Ui
* [x] It should be possible to statically host the application i.e. develop a single-page application and consider publishing to GitHub Pages or AWS S3.
  - My GitHub pages has been filled up already by another project, S3 is pretty difficult to setup for someone at this current level.
  - Alternative Solution: Use Netlify - https://happy-darwin-774cee.netlify.com
    - Netlify specialise in all-in-one integrate system for static SPAs
* [x] The application will be tested on an up-to-date version of Chrome, but it should be compatible with most modern browsers: IE11+, Chrome, Firefox and Safari.
  - I've tested all the environments listed on my local machine only - i.e. IE11+ (Using Parallels), Chrome, Firefox and Safari.

## Assessment
* [x] How clean, modular and extensible the code is.
  - Uses Husky to setup test runs for precommits and prepushes to Git
  - Clean - Prettify & Flow for cleaner more understandable code
  - Modular - code mainly follows the recommended React Architecture for small apps - with data flowing down from one 
* [x] Suitability of tools, libraries and frameworks used (for both the app itself and any build processes involved).
  - See package.json
* [x] How it looks visually and the techniques used to style the application.
* [x] Responsive web design techniques used and the approach used for layout and accessibility.
  - Responsive patterns here follow the 12 point grid system
* [x] Testing
  - Static Tests - Flow
  - Unit Tests - Jest & Enzyme
  - Acceptance & E2E (all-in-one) - Cypress
* [x] Anything above and beyond
  * [x] Pagination
  * [x] Audio Playback
  * [x] Search Debouncing
* [x] Miscellaneous
    * [x] Commit Titles and Message mainly follows the [AngularJS commit message Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)