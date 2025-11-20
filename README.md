# Trivia Trek - A Dynamic Quiz Adventure

An interactive trivia game built with React and TypeScript that fetches questions from the Open Trivia Database API.

## How to Run Your Project

### Prerequisites
- Node.js (v20.17.0 or higher)
- npm

### Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## Assumptions, Tools, and Libraries Used

### Technology Stack
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library (built on Radix UI)
- **lucide-react** - Icons
- **Open Trivia Database API** - Question source

### Assumptions
- 10 questions per game
- 30-second timer per question
- Questions auto-submit when time expires
- Multiple choice questions only
- HTML entities are decoded at the API layer
- Categories are fetched dynamically from the API
- Rate limiting: API allows 1 request per 5 seconds

## What I'd Add Next With More Time
- I would definitely add more fun animations!