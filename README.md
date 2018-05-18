# BaseAngular6PWA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Creation notes 05/18/2018 2:19 PM

### create
    ng new BaseAngular6-PWA --routing
    cd BaseAngular6-PWA

### Add PWA stuff
    ng add @angular/pwa

### Make sure it's up to date
    ng update

### Modify distribution folder in angular.json (personal pref)
	old: "outputPath": "dist/BaseAngular6-PWA",
	new: "outputPath": "dist",

### Added noscript to index.html page for lighthouse score
    Right before closing </body>
    <noscript>JavaScript required to view site</noscript>

### Added meta data description to index.html page (lighthouse score)
	<meta name="description" content="Base Angular 6 PWA">
  	<meta name="keywords" content="Angular, PWA">

### Added .htaccess file to root for HTTPS force (lighthouse score)
	https://gist.github.com/ng-chicago/8eeb71f749134983a83b8752a9a29905

### Modified angular.json to include .htaccess file in build (lighthouse score)
	"assets": [
              "src/favicon.ico",
              "src/assets",
              "src/manifest.json",
              "src/.htaccess"
            ],

### Updated manifest.json short_name (lighthouse score)
	  "short_name": "Very Short",

### Build Deploy & Audit Check
    ng build --prod --build-optimizer
    cd dist
    Push entire folder with tool of your choice to your website

### Push to GitHub
    git add -A
    git commit -m "creation"
    git remote add origin https://github.com/ng-chicago/AngularBasePWA.git
    git push -u origin master

### Other Notes
    My host does not offer HTTP2 - So dinged on Best Practices
    Some browser Extensions may slow down things and lower scores
        (turn them all off while testing)
