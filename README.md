# Cheese Quest

This project created with React\
Demo: http://193.160.226.130:3002/

Figma: [https://www.figma.com/design/CheeseQuest](https://www.figma.com/design/BwEwC1zU9j9OTcINrIsWLN/CheeseQuest?node-id=0-1&t=UhzUHufnF2kgOvkZ-1)

Backend repository: https://github.com/SyrnykyDev/CheeseQuest

## Available Routes

- /login
- /register
- / (home) 
- /authorLeaderboard
- /profile (private)

## Project Structure

- public
- src
    - assets (svg / png / ico)
    - components
        - (all basic components like Input / Button / Link (extended) / TextArea)
        - Wrapper (It will wrap every route. Wrapper has Notification / loader / Header / Footer logic)
        - (...Other components)
    - router
        - (All route logic (private && public))
    - store
        - (Redux Store for Entire Project)
    - styles
        - (common styles)
    - utils
        - (some functions)
    - views
        - (all layout pages)
- .env
- (...Other files)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

