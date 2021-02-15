# Timely Test

A small angular project which consists in a list of scheduled events with filters and pagination.
Link to the app hosted on firebase: https://timely-test-app.web.app/

## Structure of the project

Even though it's a very simple app, i tried building the architecture in a scalable way like you would do in a large project. With routing, lazy loaded modules for the pages, global SCSS variables and mixins, unit tests and a shared module for generic components, it would be pretty easy to add new features if necessary.

## Development server

To test the project locally run `npm install` and then `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests

Run `npm run test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run the `--code-coverage` option to check the tests coverage summary.
