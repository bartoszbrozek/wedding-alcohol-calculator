# Wedding Alcohol Calculator

A Vue 3 application that helps calculate the required quantities of alcohol and drinks for a wedding based on the number of guests and their drinking preferences.

## Features

- Calculate required quantities of different types of alcohol
- Support for both direct consumption (beer) and mixed drinks
- Automatic data persistence using localStorage
- Responsive design
- Real-time calculations

## Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd wedding-alcohol-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Development Features

- Hot Module Replacement (HMR)
- Vue DevTools support
- ESLint for code quality
- Automatic data saving to localStorage

## Production Build

To create a production build:

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. The production files will be generated in the `dist` directory.

3. To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

### Deploying to Production

The `dist` directory contains all the files needed for production deployment. You can deploy these files to any static file hosting service like:

- GitHub Pages
- Netlify
- Vercel
- Any web server

## Project Structure

```
wedding-alcohol-calculator/
├── src/
│   ├── App.vue          # Main application component
│   └── main.js          # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Data Persistence

The application automatically saves all data to the browser's localStorage. This means:
- Your data persists between page reloads
- Data is saved automatically when you make changes
- No server-side storage is required

## Browser Support

The application works in all modern browsers that support:
- ES6+ JavaScript
- LocalStorage
- CSS Grid and Flexbox

## License

MIT 