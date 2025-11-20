# Trivia Trek - A Dynamic Quiz Adventure

An interactive trivia game built with React and TypeScript that fetches questions from the Open Trivia Database API.

## How to Run Your Project

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

## Libraries

### Technology Stack
- **React** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **lucide-react** - Icons
- **Open Trivia Database API** - Question source

### Assumptions
- 10 questions per game
- 30-second timer per question
- Questions auto-submit when time expires
- Multiple choice questions only
- Categories are fetched dynamically from the API
- Rate limiting: API allows 1 request per 5 seconds

## What I'd Add Next With More Time
- More fun animations
