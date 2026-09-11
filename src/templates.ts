import {
  AppType,
  CodeParadigmType,
  DatabaseType,
  DbStructManagerType,
  DependencyInjectionType,
  GitWorkflowType,
  MonorepoProviderType,
  RedisDriverType,
  RepoStructType,
  RequestLoggerType,
  type TemplateSettings,
} from "./settings.service";

export interface Template {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  settings: TemplateSettings;
}

/* -------------------------------------------------------------------------- */
/*                       Template 1 — Production-Ready API                    */
/* -------------------------------------------------------------------------- */
/*
 * This is the fully-loaded preset: everything a production service tends to
 * need on day one — auth, docs, tests, linting, CI workflows, monitoring.
 */
const productionReadyApi: Template = {
  id: "production-ready-api",
  name: "Production-Ready API",
  description:
    "Fully loaded: auth, Postgres + Drizzle, Redis, monitoring, OpenAPI docs, tests, linting, and full git tooling.",
  highlights: [
    "Auth & user modules built in",
    "Postgres + Drizzle, Redis caching",
    "Monitoring with auto-configured setup",
    "Tests, linting, CI workflows included",
    "Swagger API docs with interactive UI",
  ],
  settings: {
    app: AppType.Express,
    docker_need: true,

    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,

    redis_need: true,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,

    husky_need: true,
    commitizen_need: true,
    commitlint_need: true,
    which_git_workflows: [
      GitWorkflowType.PrLinter,
      GitWorkflowType.ApplicationDeploy,
      GitWorkflowType.GitTagReleaser,
      GitWorkflowType.TechReferenceDoc,
      GitWorkflowType.All,
    ],

    prebuilt_auth_need: true,
    prebuilt_user_need: true,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: true,
    prebuilt_error_handler_need: true,
    validator_need: true,
    response_handler_need: true,

    request_logger_need: true,
    request_logger_type: RequestLoggerType.Pino,
    monitoring_need: true,
    automate_monitoring_setup: true,

    app_rate_limit_need: true,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.CompositionRoot,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: true,
    prettier_need: true,

    technical_doc_need: true,
    unit_tester_need: true,
    openapi_spec_need: true,

    swagger_ui_need: true,
    email_templates_need: true,
  },
};

/* -------------------------------------------------------------------------- */
/*                          Template 2 — Minimal API                          */
/* -------------------------------------------------------------------------- */
/*
 * Bare-bones: just an Express server with the essentials, nothing extra to
 * configure or maintain. Good for prototypes and throwaway services.
 */
const minimalApi: Template = {
  id: "minimal-api",
  name: "Minimal API",
  description:
    "Bare-bones Express + Postgres/Drizzle starter with no auth, no docs, no CI — just the essentials.",
  highlights: [
    "Just Express + Postgres, nothing extra",
    "No auth, tests, or CI to maintain",
    "Fastest way to get a server running",
  ],
  settings: {
    app: AppType.Express,
    docker_need: false,

    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,

    redis_need: false,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,

    husky_need: false,
    commitizen_need: false,
    commitlint_need: false,
    which_git_workflows: [],

    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: false,
    prebuilt_error_handler_need: true,
    validator_need: false,
    response_handler_need: false,

    request_logger_need: false,
    request_logger_type: RequestLoggerType.Morgan,
    monitoring_need: false,
    automate_monitoring_setup: false,

    app_rate_limit_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: false,
    prettier_need: false,

    technical_doc_need: false,
    unit_tester_need: false,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                       Template 3 — Microservice Starter                    */
/* -------------------------------------------------------------------------- */
/*
 * Monorepo-first, geared towards a small fleet of services sharing tooling.
 */
const microserviceStarter: Template = {
  id: "microservice-starter",
  name: "Microservice Starter",
  description:
    "Turborepo monorepo with Postgres, Redis, monitoring, and deploy/release git workflows.",
  highlights: [
    "Turborepo monorepo setup",
    "Postgres + Redis, auth included",
    "Monitoring with auto-configured setup",
    "Deploy & release git workflows ready to go",
  ],
  settings: {
    app: AppType.Express,
    docker_need: true,

    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,

    redis_need: true,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monorepo,
    monorepo_provider: MonorepoProviderType.Turborepo,

    husky_need: true,
    commitizen_need: false,
    commitlint_need: true,
    which_git_workflows: [
      GitWorkflowType.ApplicationDeploy,
      GitWorkflowType.GitTagReleaser,
    ],

    prebuilt_auth_need: true,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: true,
    prebuilt_error_handler_need: true,
    validator_need: true,
    response_handler_need: true,

    request_logger_need: true,
    request_logger_type: RequestLoggerType.Pino,
    monitoring_need: true,
    automate_monitoring_setup: true,

    app_rate_limit_need: true,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.Tsyringe,
    empty_business_logic: true,

    typescript_need: true,
    eslint_need: true,
    prettier_need: true,

    technical_doc_need: true,
    unit_tester_need: true,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                        Template 4 — Node HTTP + Mongo                      */
/* -------------------------------------------------------------------------- */
/*
 * No framework overhead — raw node:http server, functional style, Mongo/Mongoose.
 */
const nodeHttpMongo: Template = {
  id: "node-http-mongo",
  name: "Node HTTP + Mongo",
  description:
    "Framework-free node:http server with Mongoose, functional paradigm, no DI container.",
  highlights: [
    "Zero framework dependency (raw node:http)",
    "MongoDB + Mongoose",
    "Functional paradigm, no CI/git tooling",
  ],
  settings: {
    app: AppType.NodeHttp,
    docker_need: false,

    database: DatabaseType.MongoDB,
    db_struct_manager: DbStructManagerType.Mongoose,

    redis_need: false,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,

    husky_need: false,
    commitizen_need: false,
    commitlint_need: false,
    which_git_workflows: [],

    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: false,
    prebuilt_error_handler_need: true,
    validator_need: false,
    response_handler_need: false,

    request_logger_need: false,
    request_logger_type: RequestLoggerType.Morgan,
    monitoring_need: false,
    automate_monitoring_setup: false,

    app_rate_limit_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: false,
    prettier_need: false,

    technical_doc_need: false,
    unit_tester_need: false,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                    Template 5 — Serverless API (Mongo raw)                 */
/* -------------------------------------------------------------------------- */
/*
 * Express-serverless target, raw Mongo driver (no ODM), Redis for caching.
 */
const serverlessMongoApi: Template = {
  id: "serverless-mongo-api",
  name: "Serverless API",
  description:
    "Express-serverless with raw MongoDB driver and Redis caching, functional paradigm.",
  highlights: [
    "Deploys as serverless functions",
    "Raw MongoDB driver (no ODM)",
    "Redis caching layer",
  ],
  settings: {
    app: AppType.ExpressServerless,
    docker_need: false,

    database: DatabaseType.MongoDB,
    db_struct_manager: DbStructManagerType.MongoDB,

    redis_need: true,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,

    husky_need: false,
    commitizen_need: false,
    commitlint_need: false,
    which_git_workflows: [],

    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: true,
    prebuilt_error_handler_need: true,
    validator_need: true,
    response_handler_need: true,

    request_logger_need: true,
    request_logger_type: RequestLoggerType.Pino,
    monitoring_need: false,
    automate_monitoring_setup: false,

    app_rate_limit_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: true,
    prettier_need: true,

    technical_doc_need: false,
    unit_tester_need: false,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                     Template 6 — Next.js Monorepo (Prisma)                 */
/* -------------------------------------------------------------------------- */
const nextjsMonorepo: Template = {
  id: "nextjs-monorepo-prisma",
  name: "Next.js Monorepo",
  description:
    "Turborepo monorepo with Next.js, Postgres + Prisma, composition-root DI.",
  highlights: [
    "Next.js app in a Turborepo monorepo",
    "Postgres + Prisma",
    "Composition-root DI, docker-ready",
  ],
  settings: {
    app: AppType.NextJs,
    docker_need: true,

    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Prisma,

    redis_need: false,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monorepo,
    monorepo_provider: MonorepoProviderType.Turborepo,

    husky_need: true,
    commitizen_need: false,
    commitlint_need: true,
    which_git_workflows: [
      GitWorkflowType.PrLinter,
      GitWorkflowType.ApplicationDeploy,
    ],

    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: false,
    prebuilt_error_handler_need: true,
    validator_need: true,
    response_handler_need: true,

    request_logger_need: false,
    request_logger_type: RequestLoggerType.Pino,
    monitoring_need: false,
    automate_monitoring_setup: false,

    app_rate_limit_need: false,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.CompositionRoot,
    empty_business_logic: true,

    typescript_need: true,
    eslint_need: true,
    prettier_need: true,

    technical_doc_need: false,
    unit_tester_need: true,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                    Template 7 — TanStack Monorepo (Mongo)                  */
/* -------------------------------------------------------------------------- */
const tanstackMonorepo: Template = {
  id: "tanstack-monorepo-mongo",
  name: "TanStack Monorepo",
  description:
    "Turborepo monorepo with TanStack, Mongoose, IORedis caching, functional paradigm.",
  highlights: [
    "TanStack app in a Turborepo monorepo",
    "MongoDB + Mongoose, IORedis caching",
    "Functional paradigm, no DI container",
  ],
  settings: {
    app: AppType.TanStack,
    docker_need: true,

    database: DatabaseType.MongoDB,
    db_struct_manager: DbStructManagerType.Mongoose,

    redis_need: true,
    redis_driver: RedisDriverType.IORedis,

    repo_struct: RepoStructType.Monorepo,
    monorepo_provider: MonorepoProviderType.Turborepo,

    husky_need: true,
    commitizen_need: true,
    commitlint_need: true,
    which_git_workflows: [GitWorkflowType.PrLinter],

    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: true,
    prebuilt_error_handler_need: true,
    validator_need: true,
    response_handler_need: true,

    request_logger_need: true,
    request_logger_type: RequestLoggerType.Pino,
    monitoring_need: false,
    automate_monitoring_setup: false,

    app_rate_limit_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: true,
    prettier_need: true,

    technical_doc_need: false,
    unit_tester_need: false,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

/* -------------------------------------------------------------------------- */
/*                  Template 8 — Enterprise Monorepo (InversifyJS)            */
/* -------------------------------------------------------------------------- */
const enterpriseMonorepo: Template = {
  id: "enterprise-monorepo",
  name: "Enterprise Monorepo",
  description:
    "Fully-loaded Turborepo monorepo: Postgres + Drizzle, Redis, InversifyJS DI, monitoring, full docs.",
  highlights: [
    "Turborepo monorepo, InversifyJS DI",
    "Postgres + Drizzle, IORedis caching",
    "Monitoring, OpenAPI + Swagger UI, full git tooling",
  ],
  settings: {
    app: AppType.Express,
    docker_need: true,

    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,

    redis_need: true,
    redis_driver: RedisDriverType.IORedis,

    repo_struct: RepoStructType.Monorepo,
    monorepo_provider: MonorepoProviderType.Turborepo,

    husky_need: true,
    commitizen_need: true,
    commitlint_need: true,
    which_git_workflows: [GitWorkflowType.All],

    prebuilt_auth_need: true,
    prebuilt_user_need: true,
    prebuilt_reqres_handler_need: true,
    prebuilt_async_handler_need: true,
    prebuilt_error_handler_need: true,
    validator_need: true,
    response_handler_need: true,

    request_logger_need: true,
    request_logger_type: RequestLoggerType.Pino,
    monitoring_need: true,
    automate_monitoring_setup: true,

    app_rate_limit_need: true,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.InversifyJs,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: true,
    prettier_need: true,

    technical_doc_need: true,
    unit_tester_need: true,
    openapi_spec_need: true,

    swagger_ui_need: true,
    email_templates_need: true,
  },
};

/* -------------------------------------------------------------------------- */
/*                    Template 9 — Bare Bones (Manual DI)                     */
/* -------------------------------------------------------------------------- */
const bareBonesManualDi: Template = {
  id: "bare-bones-manual-di",
  name: "Bare Bones (Manual DI)",
  description:
    "node:http-free Express monolith, Postgres + Drizzle, no Redis, manual DI wiring.",
  highlights: [
    "Express monolith, no Docker/Redis",
    "Postgres + Drizzle",
    "Manual DI, no auth/docs/tests",
  ],
  settings: {
    app: AppType.NodeHttp,
    docker_need: false,

    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,

    redis_need: false,
    redis_driver: RedisDriverType.Redis,

    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,

    husky_need: false,
    commitizen_need: false,
    commitlint_need: false,
    which_git_workflows: [],

    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    prebuilt_reqres_handler_need: false,
    prebuilt_async_handler_need: false,
    prebuilt_error_handler_need: false,
    validator_need: false,
    response_handler_need: false,

    request_logger_need: false,
    request_logger_type: RequestLoggerType.Morgan,
    monitoring_need: false,
    automate_monitoring_setup: false,

    app_rate_limit_need: false,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.Manual,
    empty_business_logic: false,

    typescript_need: true,
    eslint_need: false,
    prettier_need: false,

    technical_doc_need: false,
    unit_tester_need: false,
    openapi_spec_need: false,

    swagger_ui_need: false,
    email_templates_need: false,
  },
};

export const TEMPLATES: Template[] = [
  productionReadyApi,
  minimalApi,
  microserviceStarter,
  nodeHttpMongo,
  serverlessMongoApi,
  nextjsMonorepo,
  tanstackMonorepo,
  enterpriseMonorepo,
  bareBonesManualDi,
];
