# Catálogo de Carros

Listagem de carros, onde ao clicar no card consigo ver detalhes e preencher um formulário de contato.

## Features

- Listagem de carros em formato de cards
- Visualização de detalhes do veículo
- Formulário de contato para manifestar interesse

## Tech Stack

- React 19.2.0
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 4.1.17
- React Router DOM 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- React Hook Form 7.63.0
- Zod 4.1.11

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## Project Structure

```
src/
├── assets/          # Static assets and global styles
├── core/            # Core components, utilities, and configuration
│   ├── components/  # Shared UI components
│   ├── lib/         # Library configurations (API, Query Client)
│   ├── utils/       # Utility functions
│   ├── types/       # Global TypeScript types
│   └── constants/   # Global constants
├── domain/          # Business domain modules (to be implemented)
├── layouts/         # Layout components
├── pages/           # Page components
├── router/          # Routing configuration
├── App.tsx          # Root component
└── main.tsx         # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Configuration

The application uses a REST API with the following structure:

- Public endpoints: `/api/v1/external/`
- Authenticated endpoints: `/api/v1/internal/`

Configure the API URL in the `.env` file:

```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## License

Private project