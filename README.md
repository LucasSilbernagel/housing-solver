# Housing Solver

Think you have what it takes to solve the affordable housing crisis? Prove it in this incremental clicker game!

![housing-solver](https://github.com/user-attachments/assets/435d1d44-ba76-4067-8440-69b944cf7668)

## Live Link

Link

## Tech Stack

### Front End

- [React](https://reactjs.org/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [zustand](https://github.com/pmndrs/zustand)
- [Tailwind](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TanStack Router](https://tanstack.com/router/latest)
- [clipboard-copy](https://www.npmjs.com/package/clipboard-copy)
- [clsx](https://www.npmjs.com/package/clsx)
- [javascript-time-ago](https://www.npmjs.com/package/javascript-time-ago)
- [lz-string](https://www.npmjs.com/package/lz-string)
- [React Hot Toast](https://react-hot-toast.com/)
- [react-slot-counter](https://www.npmjs.com/package/react-slot-counter)
- [react-time-ago](https://www.npmjs.com/package/react-time-ago)

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

### Tests

Tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).

Use `pnpm run test` to run all tests, or use `pnpm run test SomeFileToRun` to run a specific test file.
