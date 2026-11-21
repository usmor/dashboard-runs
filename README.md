# Dashboard Runs
[Live Demo](https://dashboard-runs.vercel.app/)

A dashboard for monitoring and managing AI agent runs, built with React and TypeScript.

## Features

- **Runs overview**: view runs with their names, repositories, branches, statuses, and execution details.
- **Status filtering**: filter runs by status.
- **Search**: find runs by name or repository.
- **Run details**: open a side drawer to view additional information, including logs and execution results.
- **Loading and error states**: loading indicators, error messages, and retry functionality.
- **Empty states**: clear feedback when no runs are available or no results match the current filters.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Vitest
- React Testing Library

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
cd dashboard-runs
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

### Testing

Run the tests:

```bash
npx vitest run
```

Or start Vitest in watch mode:

```bash
npm test
```

## Project Structure

```text
src/
├── components/
│   ├── card/
│   ├── cardList/
│   ├── header/
│   ├── runDetails/
│   ├── search/
│   ├── sidebar/
│   ├── statusBadge/
│   └── statusFilter/
├── data/
│   └── mocks.ts
├── services/
│   └── runsService.ts
├── types/
│   └── run.ts
├── utils/
│   ├── formatDate.ts
│   └── formatDuration.ts
├── App.tsx
├── App.css
└── setupTests.ts
```

## Data
The application currently uses mock data provided by `runsService`. The service can be replaced with an API integration in the future.