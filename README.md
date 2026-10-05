# Fermor — Frontend Developer Assignment

A polished, responsive Fermor homepage concept built with **React + Vite + plain CSS**.

## Product direction

The page is designed around one product idea: **financial clarity should lead to better decisions**. The experience moves from understanding money, to acting on it, to growing over time.

## Highlights

- Responsive desktop, tablet and mobile layouts
- Scroll-triggered reveal animations using `IntersectionObserver`
- Animated wealth dashboard and SVG chart
- Floating financial insight cards and subtle motion
- Auto-scrolling brand/value ticker
- Interactive recurring-investment projection calculator
- Functional insight category filtering
- Mobile navigation with accessible state labels
- Keyboard focus states and reduced-motion support
- No backend, authentication or database because the assignment asks for a homepage
- Custom inline SVG icons; no icon library dependency

## Tech stack

- React 19
- Vite 7
- Plain CSS
- Native browser APIs (`IntersectionObserver`, `requestAnimationFrame`)

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Design decisions

The visual language uses an editorial fintech aesthetic: warm off-white surfaces, deep green typography, lime financial signals, oversized type, soft borders, and restrained motion. The financial dashboard is illustrative UI created specifically for the assignment rather than a claim about live customer data.

The projection calculator uses a monthly contribution model with an illustrative 11% annual rate. It is intentionally presented as an educational interaction, not financial advice.

## Scope

This submission intentionally focuses on the requested homepage. Sign-in, account creation, backend APIs and real financial data are outside the assignment scope.

## Submission checklist

- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds
- [ ] Test desktop at 1440px / 1024px
- [ ] Test tablet around 768px
- [ ] Test mobile at 390px / 375px / 320px
- [ ] Deploy to Vercel or Netlify
- [ ] Add deployed URL to submission
