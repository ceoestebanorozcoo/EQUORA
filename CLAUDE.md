# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (TypeScript)
- **React 19**
- **Tailwind CSS v4** — no `tailwind.config.*`; configured via CSS directly in `app/globals.css`
- **MongoDB** — connection via `MONGODB_URI` env var
- **Cloudinary** — media storage (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- **JWT** — auth via `JWT_SECRET`

## Architecture

App Router structure under `app/`. Path alias `@/` maps to the project root.

**Environment variables** (defined in `.env.local`):
- `MONGODB_URI`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`
- `JWT_SECRET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Tailwind CSS v4 Notes

Tailwind v4 is imported directly via `@import "tailwindcss"` in `globals.css`. There is no `tailwind.config.ts` — theme customization is done via CSS custom properties in `globals.css`. PostCSS uses `@tailwindcss/postcss`.
