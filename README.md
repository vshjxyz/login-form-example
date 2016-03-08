Login form example
===

A simple example of a login form with validation. Done with React + redux + express (server-side).

The application is universal and the form is rendered both server and client side.

Install
---
```bash
npm i
npm run dev # dev mode with live JS and CSS reload
npm run build # minifies and builds the assets under the dist/ directory
npm start # starts the server in production mode
```

How to run tests
---
Install chrome driver and selenium server
```bash
git clone https://github.com/sebv/sv-selenium
./sv-selenium/bin/install_selenium
./sv-selenium/bin/install_chromedriver
./sv-selenium/bin/start_selenium_with_chromedriver
```

then run the server in production mode and `npm test`
```bash
npm run build && npm start &
npm test # runs nightwatch.js and executes the functional tests
```
