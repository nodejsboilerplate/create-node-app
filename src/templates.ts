import {
  AppType,
  CodeParadigmType,
  DatabaseType,
  DbStructManagerType,
  DependencyInjectionType,
  RepoStructType,
  type TemplateSettings,
} from "./settings.service";

export interface Template {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  settings: TemplateSettings;
}
const expressDrizzlePostgres: Template = {
  id: "express-drizzle-postgres",
  name: "Express + Drizzle + Postgres",
  description: "Classic Express monolith with Postgres via Drizzle ORM.",
  highlights: [
    "Express + Postgres",
    "Drizzle ORM",
    "Auth & user modules included",
  ],
  settings: {
    app: AppType.Express,
    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,
    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,
    husky_need: true,
    prebuilt_auth_need: true,
    prebuilt_user_need: true,
    monitoring_need: false,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.CompositionRoot,
    empty_business_logic: false,
    typescript_need: true,
    unit_tester_need: true,
    email_templates_need: false,
  },
};

const expressPrismaPostgres: Template = {
  id: "express-prisma-postgres",
  name: "Express + Prisma + Postgres",
  description: "Express monolith with Postgres via Prisma ORM.",
  highlights: [
    "Express + Postgres",
    "Prisma ORM",
    "Auth & user modules included",
  ],
  settings: {
    app: AppType.Express,
    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Prisma,
    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,
    husky_need: true,
    prebuilt_auth_need: true,
    prebuilt_user_need: true,
    monitoring_need: false,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.CompositionRoot,
    empty_business_logic: false,
    typescript_need: true,
    unit_tester_need: true,
    email_templates_need: false,
  },
};

const expressServerlessPrismaPostgres: Template = {
  id: "express-serverless-prisma-postgres",
  name: "Serverless Express + Prisma + Postgres",
  description: "Express-serverless deployment with Postgres via Prisma.",
  highlights: ["Deploys as serverless functions", "Postgres via Prisma"],
  settings: {
    app: AppType.ExpressServerless,
    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Prisma,
    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,
    husky_need: false,
    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    monitoring_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,
    typescript_need: true,
    unit_tester_need: false,
    email_templates_need: false,
  },
};

const expressServerlessDrizzlePostgres: Template = {
  id: "express-serverless-drizzle-postgres",
  name: "Serverless Express + Drizzle + Postgres",
  description: "Express-serverless deployment with Postgres via Drizzle.",
  highlights: ["Deploys as serverless functions", "Postgres via Drizzle"],
  settings: {
    app: AppType.ExpressServerless,
    database: DatabaseType.Postgres,
    db_struct_manager: DbStructManagerType.Drizzle,
    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,
    husky_need: false,
    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    monitoring_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,
    typescript_need: true,
    unit_tester_need: false,
    email_templates_need: false,
  },
};

const expressServerlessMongo: Template = {
  id: "express-serverless-mongo",
  name: "Serverless Express + MongoDB",
  description: "Express-serverless deployment with raw MongoDB driver.",
  highlights: [
    "Deploys as serverless functions",
    "Raw MongoDB driver (no ODM)",
  ],
  settings: {
    app: AppType.ExpressServerless,
    database: DatabaseType.MongoDB,
    db_struct_manager: DbStructManagerType.MongoDB,
    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,
    husky_need: false,
    prebuilt_auth_need: false,
    prebuilt_user_need: false,
    monitoring_need: false,
    code_paradigm: CodeParadigmType.FP,
    dependency_injection_type: DependencyInjectionType.None,
    empty_business_logic: false,
    typescript_need: true,
    unit_tester_need: false,
    email_templates_need: false,
  },
};

const expressMongo: Template = {
  id: "express-mongo",
  name: "Express + MongoDB",
  description: "Express monolith with MongoDB via Mongoose.",
  highlights: [
    "Express + MongoDB",
    "Mongoose ODM",
    "Auth & user modules included",
  ],
  settings: {
    app: AppType.Express,
    database: DatabaseType.MongoDB,
    db_struct_manager: DbStructManagerType.Mongoose,
    repo_struct: RepoStructType.Monolith,
    monorepo_provider: null,
    husky_need: true,
    prebuilt_auth_need: true,
    prebuilt_user_need: true,
    monitoring_need: false,
    code_paradigm: CodeParadigmType.OOP,
    dependency_injection_type: DependencyInjectionType.CompositionRoot,
    empty_business_logic: false,
    typescript_need: true,
    unit_tester_need: true,
    email_templates_need: false,
  },
};

export const TEMPLATES: Template[] = [
  expressDrizzlePostgres,
  expressPrismaPostgres,
  expressServerlessPrismaPostgres,
  expressServerlessDrizzlePostgres,
  expressServerlessMongo,
  expressMongo,
];
