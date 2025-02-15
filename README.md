# Housing Solver

Think you have what it takes to solve the affordable housing crisis? Prove it in this incremental clicker game!

App screenshot...

## Live Link

Link

## Tech Stack

### Front End

- [React](https://reactjs.org/)

### Linting & Formatting

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

## Run Locally

### Prerequisites

- In order to run this application locally, you must have Node.js installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have Node.js, you can find installation steps here: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
  - Make sure to install at least version 20 of node.
- Instead of `npm` or `yarn` commands, this project uses `pnpm`. Once you have Node.js installed on your computer, you can install `pnpm` by running `npm install -g pnpm`, or by following other instructions [here](https://pnpm.io/installation).

### Clone the repository

Once you have confirmed that Node.js and `pnpm` are installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/housing-solver.git`

Then `cd` into the project folder and open it in your code editor. For Visual Studio Code:

`cd housing-solver`
`code .`

### Install dependencies

To install all of the required dependencies, run `pnpm install`.

### Start up the app

- To start up the app locally, run `pnpm run dev` in your terminal. Your terminal should indicate a `localhost` URL at which you can view the app in your browser, most likely http://localhost:5173/.

## Testing

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/)

### Unit Tests

Unit tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).

Use `pnpm run test-unit` to run all unit tests, or use `pnpm run test-unit SomeFileToRun` to run a specific test file.

### E2E Tests

E2E tests are written with [Playwright](https://playwright.dev/).

Use `pnpm run test-e2e` to run all E2E tests.
