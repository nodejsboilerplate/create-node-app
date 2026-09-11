/* -------------------------------------------------------------------------- */
/*                                    Enums                                   */
/* -------------------------------------------------------------------------- */

export enum AppType {
  Express = "express",
  NodeHttp = "node-http",
  ExpressServerless = "express-serverless",
  NextJs = "nextjs",
  TanStack = "tanstack",
}

export enum RepoStructType {
  Monolith = "monolith",
  Monorepo = "monorepo",
}

export enum MonorepoProviderType {
  Turborepo = "turborepo",
}

export enum DatabaseType {
  MongoDB = "mongodb",
  Postgres = "postgres",
}

export enum DbStructManagerType {
  Drizzle = "drizzle",
  Prisma = "prisma",
  Mongoose = "mongoose",
  MongoDB = "mongodb",
}

export enum RedisDriverType {
  IORedis = "ioredis",
  Redis = "redis",
}

export enum RequestLoggerType {
  Pino = "pino",
  Morgan = "morgan",
}

export enum CodeParadigmType {
  OOP = "oop",
  FP = "fp",
}

export enum GitWorkflowType {
  PrLinter = "pr-linter",
  ApplicationDeploy = "application-deploy",
  GitTagReleaser = "git-tag-releaser",
  TechReferenceDoc = "tech-reference-doc",
  All = "all",
}

export enum DependencyInjectionType {
  None = "none",
  CompositionRoot = "composition_root",
  Manual = "manual",
  Tsyringe = "tsyringe",
  InversifyJs = "inversifyjs",
}

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export interface SettingsType {
  app_name: string;
  app: AppType;
  docker_need: boolean;

  // Database
  database: DatabaseType;
  db_struct_manager: DbStructManagerType;

  // Redis
  redis_need: boolean;
  redis_driver: RedisDriverType;

  // Repo structure
  repo_struct: RepoStructType;
  monorepo_provider: MonorepoProviderType | null;

  // Git / commit tooling
  husky_need: boolean;
  commitizen_need: boolean;
  commitlint_need: boolean;
  which_git_workflows: GitWorkflowType[];

  // Prebuilt modules
  prebuilt_auth_need: boolean;
  prebuilt_user_need: boolean;
  prebuilt_reqres_handler_need: boolean;
  prebuilt_async_handler_need: boolean;
  prebuilt_error_handler_need: boolean;
  validator_need: boolean;
  response_handler_need: boolean;

  // Logging / monitoring
  request_logger_need: boolean;
  request_logger_type: RequestLoggerType;
  monitoring_need: boolean;

  automate_monitoring_setup: boolean;

  // Misc app behavior
  app_rate_limit_need: boolean;
  code_paradigm: CodeParadigmType;
  dependency_injection_type: DependencyInjectionType;
  empty_business_logic: boolean;

  // Language / code quality
  typescript_need: boolean;
  eslint_need: boolean;
  prettier_need: boolean;

  // Docs / testing / API
  technical_doc_need: boolean;
  unit_tester_need: boolean;
  openapi_spec_need: boolean;
  swagger_ui_need: boolean;
  email_templates_need: boolean;
}

/** Every field except app_name — used for templates, which don't hardcode a project name. */
export type TemplateSettings = Omit<SettingsType, "app_name">;

/* -------------------------------------------------------------------------- */
/*                                   Class                                    */
/* -------------------------------------------------------------------------- */

export class Settings implements SettingsType {
  app_name: string = "myapp";
  app: AppType = AppType.Express;
  docker_need: boolean = false;

  database: DatabaseType = DatabaseType.Postgres;
  db_struct_manager: DbStructManagerType = DbStructManagerType.Drizzle;

  redis_need: boolean = true;
  redis_driver: RedisDriverType = RedisDriverType.Redis;

  repo_struct: RepoStructType = RepoStructType.Monolith;
  monorepo_provider: MonorepoProviderType | null = null;

  husky_need: boolean = false;
  commitizen_need: boolean = false;
  commitlint_need: boolean = false;
  which_git_workflows: GitWorkflowType[] = [];

  prebuilt_auth_need: boolean = false;
  prebuilt_user_need: boolean = false;
  prebuilt_reqres_handler_need: boolean = true;
  prebuilt_async_handler_need: boolean = false;
  prebuilt_error_handler_need: boolean = true;
  validator_need: boolean = true;
  response_handler_need: boolean = true;

  request_logger_need: boolean = true;
  request_logger_type: RequestLoggerType = RequestLoggerType.Pino;
  monitoring_need: boolean = false;
  automate_monitoring_setup: boolean = false;

  app_rate_limit_need: boolean = true;
  code_paradigm: CodeParadigmType = CodeParadigmType.OOP;
  dependency_injection_type: DependencyInjectionType =
    DependencyInjectionType.None;
  empty_business_logic: boolean = false;

  typescript_need: boolean = true;
  eslint_need: boolean = true;
  prettier_need: boolean = true;

  technical_doc_need: boolean = false;
  unit_tester_need: boolean = true;
  openapi_spec_need: boolean = false;

  swagger_ui_need: boolean = false;
  email_templates_need: boolean = false;

  /* ---------------------------- Individual setters --------------------------- */

  setAppName(value: string): this {
    this.app_name = value;
    return this;
  }

  setApp(value: AppType): this {
    this.app = value;
    return this;
  }

  setDockerNeed(value: boolean): this {
    this.docker_need = value;
    return this;
  }

  setRedisNeed(value: boolean): this {
    this.redis_need = value;
    return this;
  }

  setRedisDriver(value: RedisDriverType): this {
    this.redis_driver = value;
    return this;
  }

  setDatabase(value: DatabaseType): this {
    this.database = value;
    return this;
  }

  setDbStructManager(value: DbStructManagerType): this {
    this.db_struct_manager = value;
    return this;
  }

  setHuskyNeed(value: boolean): this {
    this.husky_need = value;
    return this;
  }

  setCommitizenNeed(value: boolean): this {
    this.commitizen_need = value;
    return this;
  }

  setCommitlintNeed(value: boolean): this {
    this.commitlint_need = value;
    return this;
  }

  setWhichGitWorkflows(value: GitWorkflowType[]): this {
    this.which_git_workflows = value;
    return this;
  }

  setRepoStruct(value: RepoStructType): this {
    this.repo_struct = value;
    return this;
  }

  setMonorepoProvider(value: MonorepoProviderType | null): this {
    this.monorepo_provider = value;
    return this;
  }

  setPrebuiltAuthNeed(value: boolean): this {
    this.prebuilt_auth_need = value;
    return this;
  }

  setPrebuiltUserNeed(value: boolean): this {
    this.prebuilt_user_need = value;
    return this;
  }

  setPrebuiltReqresHandlerNeed(value: boolean): this {
    this.prebuilt_reqres_handler_need = value;
    return this;
  }

  setPrebuiltAsyncHandlerNeed(value: boolean): this {
    this.prebuilt_async_handler_need = value;
    return this;
  }

  setPrebuiltErrorHandlerNeed(value: boolean): this {
    this.prebuilt_error_handler_need = value;
    return this;
  }

  setValidatorNeed(value: boolean): this {
    this.validator_need = value;
    return this;
  }

  setResponseHandlerNeed(value: boolean): this {
    this.response_handler_need = value;
    return this;
  }

  setRequestLoggerNeed(value: boolean): this {
    this.request_logger_need = value;
    return this;
  }

  setRequestLoggerType(value: RequestLoggerType): this {
    this.request_logger_type = value;
    return this;
  }

  setMonitoringNeed(value: boolean): this {
    this.monitoring_need = value;
    // If monitoring is turned off, automated monitoring setup makes no sense either.
    if (!value) {
      this.automate_monitoring_setup = false;
    }
    return this;
  }

  setAutomateMonitoringSetup(value: boolean): this {
    this.automate_monitoring_setup = value;
    return this;
  }

  setAppRateLimitNeed(value: boolean): this {
    this.app_rate_limit_need = value;
    return this;
  }

  setCodeParadigm(value: CodeParadigmType): this {
    this.code_paradigm = value;
    return this;
  }

  setDependencyInjectionType(value: DependencyInjectionType): this {
    this.dependency_injection_type = value;
    return this;
  }

  setEmptyBusinessLogic(value: boolean): this {
    this.empty_business_logic = value;
    return this;
  }

  setTypescriptNeed(value: boolean): this {
    this.typescript_need = value;
    return this;
  }

  setEslintNeed(value: boolean): this {
    this.eslint_need = value;
    return this;
  }

  setPrettierNeed(value: boolean): this {
    this.prettier_need = value;
    return this;
  }

  setTechnicalDocNeed(value: boolean): this {
    this.technical_doc_need = value;
    return this;
  }

  setUnitTesterNeed(value: boolean): this {
    this.unit_tester_need = value;
    return this;
  }

  setOpenapiSpecNeed(value: boolean): this {
    this.openapi_spec_need = value;
    return this;
  }

  setSwaggerUiNeed(value: boolean): this {
    this.swagger_ui_need = value;
    return this;
  }

  setEmailTemplatesNeed(value: boolean): this {
    this.email_templates_need = value;
    return this;
  }

  /* ------------------------------ Bulk operations ----------------------------- */

  applyTemplate(template: TemplateSettings): this {
    Object.assign(this, template);
    return this;
  }

  getSettings(): SettingsType {
    return {
      app_name: this.app_name,
      app: this.app,
      docker_need: this.docker_need,
      database: this.database,
      db_struct_manager: this.db_struct_manager,
      redis_need: this.redis_need,
      redis_driver: this.redis_driver,
      repo_struct: this.repo_struct,
      monorepo_provider: this.monorepo_provider,
      husky_need: this.husky_need,
      commitizen_need: this.commitizen_need,
      commitlint_need: this.commitlint_need,
      which_git_workflows: this.which_git_workflows,
      prebuilt_auth_need: this.prebuilt_auth_need,
      prebuilt_user_need: this.prebuilt_user_need,
      prebuilt_reqres_handler_need: this.prebuilt_reqres_handler_need,
      prebuilt_async_handler_need: this.prebuilt_async_handler_need,
      prebuilt_error_handler_need: this.prebuilt_error_handler_need,
      validator_need: this.validator_need,
      response_handler_need: this.response_handler_need,
      request_logger_need: this.request_logger_need,
      request_logger_type: this.request_logger_type,
      monitoring_need: this.monitoring_need,
      automate_monitoring_setup: this.automate_monitoring_setup,
      app_rate_limit_need: this.app_rate_limit_need,
      code_paradigm: this.code_paradigm,
      dependency_injection_type: this.dependency_injection_type,
      empty_business_logic: this.empty_business_logic,
      typescript_need: this.typescript_need,
      eslint_need: this.eslint_need,
      prettier_need: this.prettier_need,
      technical_doc_need: this.technical_doc_need,
      unit_tester_need: this.unit_tester_need,
      openapi_spec_need: this.openapi_spec_need,
      swagger_ui_need: this.swagger_ui_need,
      email_templates_need: this.email_templates_need,
    };
  }
}
