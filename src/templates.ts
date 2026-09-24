export type TemplateType =
  | "ExpressDrizzlePostgres"
  | "ExpressDrizzlePostgresInversify"
  | "ExpressDrizzlePostgresMonorepo"
  | "MCP"
  | "ExpressDrizzlePostgresMicroService"
  | "ExpressDrizzlePostgresEmpty"
  | "ExpressDrizzlePostgresInversifyEmpty"
  | "ExpressDrizzlePostgresMonorepoEmpty";

export interface Template {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  type: TemplateType;
}

const expressDrizzlePostgres: Template = {
  id: "express-drizzle-postgres",
  name: "Express + Drizzle + Postgres",
  description: "Classic Express monolith with Postgres via Drizzle ORM.",
  highlights: [
    "Express + Postgres",
    "Drizzle ORM",
    "Auth & user modules included",
    "Grafana monitoring",
  ],
  type: "ExpressDrizzlePostgres",
};

const expressDrizzlePostgresInversify: Template = {
  id: "express-drizzle-postgres-inversify",
  name: "Express + Drizzle + Postgres (Inversify)",
  description:
    "Express monolith with Postgres via Drizzle ORM, using Inversify for dependency injection.",
  highlights: [
    "Express + Postgres",
    "Drizzle ORM",
    "Inversify dependency injection",
    "Auth & user modules included",
    "Grafana monitoring",
  ],
  type: "ExpressDrizzlePostgresInversify",
};

const expressDrizzlePostgresMonorepo: Template = {
  id: "express-drizzle-postgres-monorepo",
  name: "Express + Drizzle + Postgres (Monorepo)",
  description: "Express + Postgres via Drizzle ORM, structured as a monorepo.",
  highlights: [
    "Express + Postgres",
    "Drizzle ORM",
    "Monorepo structure",
    "Auth & user modules included",
    "Grafana monitoring",
  ],
  type: "ExpressDrizzlePostgresMonorepo",
};

const mcp: Template = {
  id: "mcp",
  name: "MCP Server",
  description:
    "Starter template for building an MCP (Model Context Protocol) server",
  highlights: [
    "Custom tool & resource responses",
    "Exception handler included",
    "Dockerfile included",
    "TypeScript",
    "Streamable HTTP",
  ],
  type: "MCP",
};

// const expressDrizzlePostgresMicroService: Template = {
//   id: "express-drizzle-postgres-microservice",
//   name: "Express + Drizzle + Postgres (Microservice)",
//   description:
//     "Express + Postgres via Drizzle ORM, structured as microservices with user and message services to start.",
//   highlights: [
//     "Express + Postgres",
//     "Drizzle ORM",
//     "User & message services included",
//     "RabbitMQ cluster messaging",
//     "Kubernetes deployment",
//     "Grafana monitoring",
//   ],
//   type: "ExpressDrizzlePostgresMicroService",
// };

const expressDrizzlePostgresEmpty: Template = {
  id: "express-drizzle-postgres-empty",
  name: "Express + Drizzle + Postgres (Empty)",
  description:
    "Bare Express monolith with Postgres via Drizzle ORM, no auth or user modules included.",
  highlights: ["Express + Postgres", "Drizzle ORM"],
  type: "ExpressDrizzlePostgresEmpty",
};

const expressDrizzlePostgresInversifyEmpty: Template = {
  id: "express-drizzle-postgres-inversify-empty",
  name: "Express + Drizzle + Postgres (Inversify, Empty)",
  description:
    "Bare Express monolith with Postgres via Drizzle ORM, using Inversify for dependency injection, no auth or user modules included.",
  highlights: [
    "Express + Postgres",
    "Drizzle ORM",
    "Inversify dependency injection",
  ],
  type: "ExpressDrizzlePostgresInversifyEmpty",
};

const expressDrizzlePostgresMonorepoEmpty: Template = {
  id: "express-drizzle-postgres-monorepo-empty",
  name: "Express + Drizzle + Postgres (Monorepo, Empty)",
  description:
    "Bare Express + Postgres via Drizzle ORM, structured as a monorepo, no auth or user modules included.",
  highlights: ["Express + Postgres", "Drizzle ORM", "Monorepo structure"],
  type: "ExpressDrizzlePostgresMonorepoEmpty",
};

export const TEMPLATES: Template[] = [
  expressDrizzlePostgres,
  expressDrizzlePostgresInversify,
  expressDrizzlePostgresMonorepo,
  mcp,
  // expressDrizzlePostgresMicroService,
  expressDrizzlePostgresEmpty,
  expressDrizzlePostgresInversifyEmpty,
  expressDrizzlePostgresMonorepoEmpty,
];