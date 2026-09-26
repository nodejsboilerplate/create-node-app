# Nodejs boilerplate installer

## Available Templates
- Express + Drizzle + Postgres
- Express + Drizzle + Postgres (Inversify)
- Express + Drizzle + Postgres (Monorepo)
- MCP Server
- Express + Drizzle + Postgres (Empty)
- Express + Drizzle + Postgres (Inversify, Empty)
- Express + Drizzle + Postgres (Monorepo, Empty)

## Getting Started
```bash
npx @npmmahin/create-node-app@latest
cp .env.example .env
cp .env.example .env.production.local
docker compose up -d
pnpm dev
```

> [!NOTE]
> The version follows the `CurrentYear.Minor.Patch` format.
