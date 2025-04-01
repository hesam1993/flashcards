# Flash Cards Application

A web application for learning new words using flash cards. This application uses React for the frontend and Express with SQLite for the backend.

## Features

- Add new words as cards with definitions
- Review all added cards
- Sort words into "Known" and "To Review" categories
- Track your learning progress
- Persistent storage in SQLite database

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - CSS3 with Flexbox

- **Backend**:
  - Node.js
  - Express
  - Sequelize ORM
  - SQLite

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (v7 or newer)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/hesam1993/flash-cards.git
   cd flash-cards
   ```

2. Install dependencies:
   ```
   npm install
   cd flash-cards
   npm install
   ```

3. Set up the database:
   ```
   node server/db/setup.js
   ```

4. Start the server:
   ```
   node server/server.js
   ```

5. In a new terminal, start the frontend:
   ```
   cd flash-cards
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

- `flash-cards/` - React frontend application
  - `src/` - Frontend source code
  - `public/` - Static assets
- `server/` - Express backend application
  - `db/` - Database configuration and setup
  - `server.js` - Main server file

## Using the Application

1. Add new words using the form at the top of the page
2. Click "Start Review" to begin reviewing your cards
3. For each card, click "I Know This" or "Don't Know Yet" 
4. Words you know will be moved to the "Known Words" list
5. Words you don't know will stay in rotation for additional review

## License

MIT

## Acknowledgements

- React - [https://reactjs.org/](https://reactjs.org/)
- Express - [https://expressjs.com/](https://expressjs.com/)
- Sequelize - [https://sequelize.org/](https://sequelize.org/) 