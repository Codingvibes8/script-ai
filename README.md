# ScriptAI

AI-powered script generation platform for content creators. Generate professional, engaging scripts for YouTube, TikTok, Podcasts, and Instagram Reels using GPT-4o.

## Features

- **AI Script Generation** - Create scripts using OpenAI's GPT-4o model with real-time streaming
- **Multiple Content Types** - YouTube videos, TikTok shorts, Podcasts, Instagram Reels
- **Customizable Parameters** - Duration, tone, target audience
- **Script Management** - Save, view, copy, download, and delete scripts
- **User Dashboard** - Track usage and manage generated scripts
- **Subscription Plans** - Free, Pro, and Enterprise tiers with usage limits

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4o

## Getting Started

### Prerequisites

- Node.js 16+
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd script-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Auth Redirect (development)
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

4. Set up your Supabase database with the required tables:
   - `scripts` - Stores generated scripts
   - `subscriptions` - Manages user plans and usage limits

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
script-ai/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (generate, save, manage scripts)
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── generate/          # Script generation page
│   └── subscription/      # Subscription management
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── ...               # Feature components
├── lib/                   # Utilities and Supabase clients
└── middleware.ts          # Auth middleware
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Subscription Plans

| Plan | Price | Scripts/Month |
|------|-------|---------------|
| Free | $0 | 5 |
| Pro | $19/month | 50 |
| Enterprise | $49/month | Unlimited |

## License

MIT
