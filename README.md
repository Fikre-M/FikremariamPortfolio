# Fikremariam Kassa — Portfolio

A modern, responsive personal portfolio website built with React 19 and TypeScript. Live at [portfolio-tau-five-dqhmersn7z.vercel.app](https://portfolio-tau-five-dqhmersn7z.vercel.app).

## Performance (Lighthouse)

| Metric | Score |
|---|---|
| Performance | 95 |
| Accessibility | 92 |
| Best Practices | 100 |
| SEO | 100 |

> Scores measured on the production build at [portfolio-tau-five-dqhmersn7z.vercel.app](https://portfolio-tau-five-dqhmersn7z.vercel.app) using Chrome DevTools Lighthouse (desktop, no throttling).

Key wins: lazy-loaded images, code splitting via Vite, minified assets, proper cache headers, and semantic HTML with meta tags.

## Tech Stack

- React 19, TypeScript, Vite
- Tailwind CSS, Framer Motion, styled-components
- React Router DOM, React Hook Form
- EmailJS (contact form)
- React Helmet Async (SEO)
- Vitest, React Testing Library

## Sections

- Hero, About, Skills, Projects, Contact
- AI-powered portfolio chatbot
- Dark/light mode toggle
- Scroll-to-top, lazy images, error boundary

## Projects Featured

| Project | Stack |
|---|---|
| EthioAI-TourismPlatform | React, Node.js, MySQL, Express |
| Rideshare-App | React, Tailwind CSS, Framer Motion |
| AIforHealth | React, Tailwind CSS, Framer Motion, MongoDB|
| Case-Management-Portal | React, TMDB API |
| FikremariamPortfolio | React, TypeScript, Tailwind, Vite |

## Getting Started

```bash
git clone https://github.com/Fikre-M/FP.git
cd portfolio
npm install --legacy-peer-deps
cp .env.example .env
# fill in your EmailJS credentials
npm run dev
```

## Environment Variables

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://www.emailjs.com). The public key is safe to expose in the browser — protect your account by setting allowed domains in the EmailJS dashboard.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # ESLint
npm run test       # run tests once
```

## Deployment

Deployed on Vercel. The `vercel.json` in the `portfolio/` directory handles build config and SPA routing rewrites.

To deploy your own:
```bash
cd portfolio
vercel --prod
```

Then add the three `VITE_EMAILJS_*` environment variables in the Vercel dashboard under `Settings → Environment Variables`.

## Author

**Fikremariam Kassa**
- GitHub: [Fikre-M](https://github.com/Fikre-M)
- LinkedIn: [fikremariam-k-28916062](https://www.linkedin.com/in/fikremariam-k-28916062/)
- Email: fikreddu@gmail.com
