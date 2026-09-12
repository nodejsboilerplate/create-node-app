// settings.service.ts
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

export enum CodeParadigmType {
  OOP = "oop",
  FP = "fp",
}

export enum DependencyInjectionType {
  None = "none",
  CompositionRoot = "composition_root",
  Manual = "manual",
  Tsyringe = "tsyringe",
  InversifyJs = "inversifyjs",
}

export enum TableType {
  UserAddresses = "user_addresses",
  UserContacts = "user_contacts",
}

export interface SettingsType {
  app_name: string;
  app: AppType;
  database: DatabaseType;
  db_struct_manager: DbStructManagerType;
  repo_struct: RepoStructType;
  monorepo_provider: MonorepoProviderType | null;
  husky_need: boolean;
  prebuilt_auth_need: boolean;
  prebuilt_user_need: boolean;
  selected_tables: TableType[];
  monitoring_need: boolean;
  code_paradigm: CodeParadigmType;
  dependency_injection_type: DependencyInjectionType;
  empty_business_logic: boolean;
  typescript_need: boolean;
  unit_tester_need: boolean;
  email_templates_need: boolean;
}

export type TemplateSettings = Omit<SettingsType, "app_name">;

export class Settings implements SettingsType {
  app_name: string = "myapp";
  app: AppType = AppType.Express;
  database: DatabaseType = DatabaseType.Postgres;
  db_struct_manager: DbStructManagerType = DbStructManagerType.Drizzle;
  repo_struct: RepoStructType = RepoStructType.Monolith;
  monorepo_provider: MonorepoProviderType | null = null;
  husky_need: boolean = false;
  prebuilt_auth_need: boolean = false;
  prebuilt_user_need: boolean = false;
  monitoring_need: boolean = false;
  code_paradigm: CodeParadigmType = CodeParadigmType.OOP;
  dependency_injection_type: DependencyInjectionType =
    DependencyInjectionType.None;
  empty_business_logic: boolean = false;
  typescript_need: boolean = true;
  unit_tester_need: boolean = true;
  email_templates_need: boolean = false;

  selected_tables: TableType[] = [];

  setSelectedTables(v: TableType[]): this {
    this.selected_tables = v;
    return this;
  }
  setAppName(v: string): this {
    this.app_name = v;
    return this;
  }
  setApp(v: AppType): this {
    this.app = v;
    return this;
  }
  setDatabase(v: DatabaseType): this {
    this.database = v;
    return this;
  }
  setDbStructManager(v: DbStructManagerType): this {
    this.db_struct_manager = v;
    return this;
  }
  setRepoStruct(v: RepoStructType): this {
    this.repo_struct = v;
    return this;
  }
  setMonorepoProvider(v: MonorepoProviderType | null): this {
    this.monorepo_provider = v;
    return this;
  }
  setHuskyNeed(v: boolean): this {
    this.husky_need = v;
    return this;
  }
  setPrebuiltAuthNeed(v: boolean): this {
    this.prebuilt_auth_need = v;
    return this;
  }
  setPrebuiltUserNeed(v: boolean): this {
    this.prebuilt_user_need = v;
    return this;
  }
  setMonitoringNeed(v: boolean): this {
    this.monitoring_need = v;
    return this;
  }
  setCodeParadigm(v: CodeParadigmType): this {
    this.code_paradigm = v;
    return this;
  }
  setDependencyInjectionType(v: DependencyInjectionType): this {
    this.dependency_injection_type = v;
    return this;
  }
  setEmptyBusinessLogic(v: boolean): this {
    this.empty_business_logic = v;
    return this;
  }
  setTypescriptNeed(v: boolean): this {
    this.typescript_need = v;
    return this;
  }
  setUnitTesterNeed(v: boolean): this {
    this.unit_tester_need = v;
    return this;
  }
  setEmailTemplatesNeed(v: boolean): this {
    this.email_templates_need = v;
    return this;
  }

  applyTemplate(t: TemplateSettings): this {
    Object.assign(this, t);
    return this;
  }

  getSettings(): SettingsType {
    const {
      app_name,
      app,
      database,
      db_struct_manager,
      repo_struct,
      monorepo_provider,
      husky_need,
      prebuilt_auth_need,
      prebuilt_user_need,
      monitoring_need,
      code_paradigm,
      dependency_injection_type,
      empty_business_logic,
      typescript_need,
      unit_tester_need,
      email_templates_need,
      selected_tables
    } = this;
    return {
      app_name,
      app,
      selected_tables,
      database,
      db_struct_manager,
      repo_struct,
      monorepo_provider,
      husky_need,
      prebuilt_auth_need,
      prebuilt_user_need,
      monitoring_need,
      code_paradigm,
      dependency_injection_type,
      empty_business_logic,
      typescript_need,
      unit_tester_need,
      email_templates_need,
    };
  }
}
