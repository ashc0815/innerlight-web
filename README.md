# Innerlight

> Faith, Hope, Love — The Light in the Darkness.

Innerlight is an AI-powered emotional support application that combines faith-based wisdom with psychological care.

## Features

- 🌟 Beautiful, calming video-background interface
- 💬 AI-powered conversational support
- 🔐 Secure authentication via Supabase
- 📱 Progressive Web App (PWA) support
- 🎨 Glassmorphism design with smooth animations

## Tech Stack

- **Frontend:** Vanilla JS with Vite
- **Styling:** Custom CSS (no frameworks)
- **Auth:** Supabase
- **AI Backend:** Claude via n8n workflows
- **Database:** Supabase (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/innerlight-web.git
   cd innerlight-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. Add your hero video:
   - Place your `hero.mp4` file in the `public/` folder
   - Recommended: Compress video using HandBrake or FFmpeg for web

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
innerlight-web/
├── public/              # Static assets (videos, icons, etc.)
│   ├── hero.mp4         # Background video
│   ├── manifest.json    # PWA manifest
│   ├── robots.txt       # Search engine directives
│   └── sitemap.xml      # Site map for SEO
├── src/
│   ├── index.html       # Landing page
│   ├── pages/           # Additional pages
│   │   ├── about.html
│   │   ├── chat.html
│   │   ├── privacy.html
│   │   └── register.html
│   ├── scripts/         # JavaScript modules
│   │   ├── auth.js      # Supabase authentication
│   │   ├── auth-page.js # Register/login page logic
│   │   ├── chat.js      # Chat functionality
│   │   ├── main.js      # Main entry point
│   │   └── static.js    # Static pages script
│   └── styles/
│       └── main.css     # All styles
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── vite.config.js       # Vite configuration
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

### Manual / VPS

1. Build: `npm run build`
2. Upload `dist/` folder to your server
3. Configure nginx/Apache to serve static files
4. Set up SSL with Let's Encrypt

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `VITE_CHAT_WEBHOOK_URL` | n8n webhook URL for chat | No |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Fonts: [Caveat](https://fonts.google.com/specimen/Caveat) and [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4)
- Auth: [Supabase](https://supabase.com)
- Build: [Vite](https://vitejs.dev)

---

*Light is always there, even when unnoticed.*
