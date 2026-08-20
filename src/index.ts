#!/usr/bin/env node

import { spawn } from "child_process";
import { Octokit } from "@octokit/core";
import {
  AppType,
  CodeParadigmType,
  DatabaseType,
  DbStructManagerType,
  MonorepoProviderType,
  RedisDriverType,
  RepoStructType,
  RequestLoggerType,
  Settings,
} from "./settings.service";
import { select, confirm, input } from "@inquirer/prompts";

const settings = new Settings();
const octokit = new Octokit();

/* -------------------------------------------------------------------------- */
/*                                App name & type                             */
/* -------------------------------------------------------------------------- */
const get_repo_type = await select({
  message: "Select a repository structure:",
  choices: [
    {
      name: "Monolith",
      value: RepoStructType.Monolith,
      description: "Single deployable app, one codebase",
    },
    {
      name: "Monorepo",
      value: RepoStructType.Monorepo,
      description: "Multiple apps/packages in one repo",
    },
  ],
  default: RepoStructType.Monolith,
});
settings.setRepoStruct(get_repo_type);

if (settings.repo_struct === RepoStructType.Monorepo) {
  const get_monorepo_provider = await select({
    message: "Select monorepo provider:",
    choices: [
      { name: "None", value: null },
      { name: "Turborepo", value: MonorepoProviderType.Turborepo },
    ],
    default: null,
  });
  if (get_monorepo_provider) {
    settings.setMonorepoProvider(get_monorepo_provider);
  }
}

settings.setAppName(
  await input({
    message:
      settings.repo_struct === RepoStructType.Monolith
        ? "Enter app name:"
        : "Enter apps repository name:",
  })
);

const get_app = await select({
  message: "Select app type:",
  choices: [
    { name: "Express", value: AppType.Express },
    { name: "Node HTTP", value: AppType.NodeHttp },
    { name: "Express Serverless", value: AppType.ExpressServerless },
    { name: "Next.js", value: AppType.NextJs },
    { name: "TanStack", value: AppType.TanStack },
  ],
  default: AppType.Express,
});
settings.setApp(get_app);

/* -------------------------------------------------------------------------- */
/*                                   Docker                                   */
/* -------------------------------------------------------------------------- */
const get_docker_need = await confirm({
  message: "Do you need Docker setup?",
  default: false,
});
settings.setDockerNeed(get_docker_need);

/* -------------------------------------------------------------------------- */
/*                                   Database                                 */
/* -------------------------------------------------------------------------- */
const get_database = await select({
  message: "Select database:",
  choices: [
    { name: "MongoDB", value: DatabaseType.MongoDB },
    { name: "PostgreSQL", value: DatabaseType.Postgres },
  ],
  default: DatabaseType.Postgres,
});
settings.setDatabase(get_database);

const dbStructManagerChoices =
  get_database === DatabaseType.MongoDB
    ? [
        { name: "Mongoose", value: DbStructManagerType.Mongoose },
        { name: "MongoDB (raw driver)", value: DbStructManagerType.MongoDB },
        { name: "Prisma", value: DbStructManagerType.Prisma },
      ]
    : [
        { name: "Drizzle", value: DbStructManagerType.Drizzle },
        { name: "Prisma", value: DbStructManagerType.Prisma },
      ];

const get_db_struct_manager = await select({
  message: "Select ORM/ODM/driver:",
  choices: dbStructManagerChoices,
  default: dbStructManagerChoices[0]?.value,
});
settings.setDbStructManager(get_db_struct_manager);

/* -------------------------------------------------------------------------- */
/*                                   Redis                                    */
/* -------------------------------------------------------------------------- */
const get_redis_need = await confirm({
  message: "Do you need Redis?",
  default: true,
});
settings.setRedisNeed(get_redis_need);

if (settings.redis_need) {
  const get_redis_driver = await select({
    message: "Select Redis driver:",
    choices: [
      { name: "ioredis", value: RedisDriverType.IORedis },
      { name: "redis", value: RedisDriverType.Redis },
    ],
    default: RedisDriverType.Redis,
  });
  settings.setRedisDriver(get_redis_driver);
}

/* -------------------------------------------------------------------------- */
/*                                   Tooling                                  */
/* -------------------------------------------------------------------------- */
const get_husky_need = await confirm({
  message: "Do you need Husky (git hooks)?",
  default: false,
});
settings.setHuskyNeed(get_husky_need);

const get_commitizen_need = await confirm({
  message: "Do you need Commitizen (conventional commits)?",
  default: false,
});
settings.setCommitizenNeed(get_commitizen_need);

/* -------------------------------------------------------------------------- */
/*                              Prebuilt Modules                              */
/* -------------------------------------------------------------------------- */
const get_prebuilt_auth_need = await confirm({
  message: "Include prebuilt auth module?",
  default: false,
});
settings.setPrebuiltAuthNeed(get_prebuilt_auth_need);

const get_prebuilt_user_need = await confirm({
  message: "Include prebuilt user module?",
  default: false,
});
settings.setPrebuiltUserNeed(get_prebuilt_user_need);

const get_prebuilt_reqres_handler_need = await confirm({
  message: "Include prebuilt request/response handler?",
  default: true,
});
settings.setPrebuiltReqresHandlerNeed(get_prebuilt_reqres_handler_need);

const get_prebuilt_async_handler_need = await confirm({
  message: "Include prebuilt async handler wrapper?",
  default: false,
});
settings.setPrebuiltAsyncHandlerNeed(get_prebuilt_async_handler_need);

const get_prebuilt_error_handler_need = await confirm({
  message: "Include prebuilt error handler?",
  default: true,
});
settings.setPrebuiltErrorHandlerNeed(get_prebuilt_error_handler_need);

/* -------------------------------------------------------------------------- */
/*                                   Logging                                  */
/* -------------------------------------------------------------------------- */
const get_request_logger_need = await confirm({
  message: "Do you need request logging?",
  default: true,
});
settings.setRequestLoggerNeed(get_request_logger_need);

if (settings.request_logger_need) {
  const get_request_logger_type = await select({
    message: "Select request logger:",
    choices: [
      { name: "Pino", value: RequestLoggerType.Pino },
      { name: "Morgan", value: RequestLoggerType.Morgan },
    ],
    default: RequestLoggerType.Pino,
  });
  settings.setRequestLoggerType(get_request_logger_type);
}

/* -------------------------------------------------------------------------- */
/*                                Rate limiting                               */
/* -------------------------------------------------------------------------- */
const get_app_rate_limit_need = await confirm({
  message: "Enable app rate limiting?",
  default: true,
});
settings.setAppRateLimitNeed(get_app_rate_limit_need);

/* -------------------------------------------------------------------------- */
/*                                Code paradigm                               */
/* -------------------------------------------------------------------------- */
const get_code_paradigm = await select({
  message: "Select code paradigm:",
  choices: [
    { name: "OOP", value: CodeParadigmType.OOP },
    { name: "FP", value: CodeParadigmType.FP },
  ],
  default: CodeParadigmType.OOP,
});
settings.setCodeParadigm(get_code_paradigm);

/* -------------------------------------------------------------------------- */
/*                                   Result                                   */
/* -------------------------------------------------------------------------- */
const finalSettings = settings.getSettings();
console.log(finalSettings);

let REPO_NAME: string;

// try {
//   const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
//     owner: "gitmahin",
//     repo: "crisis-desk-ai",
//   });

//   const clone_url = data.clone_url;

//   const clone_process = spawn("git", ["clone", clone_url, "cloned"]);

//   clone_process.stdout.setEncoding("utf8");
//   clone_process.stderr.setEncoding("utf8");

//   clone_process.stdout.on("data", (data) => {
//     console.log("haha", data);
//   });

//   clone_process.stderr.on("data", (data) => {
//     console.log("mahin", data);
//   });

//   clone_process.on("close", (code) => {
//     console.log(`Cloning done with code: ${code}`);

//     if (code === 0) {
//       console.log("Starting dependency installation...");

//       const install_deps = spawn("pnpm", ["i"], { cwd: "cloned" });

//       install_deps.stdout.on("data", (data) => {
//         console.log(data.toString());
//       });

//       install_deps.stderr.on("data", (data) => {
//         console.error(data.toString());
//       });

//       install_deps.on("close", (installCode) => {
//         console.log(`Installing deps done with code: ${installCode}`);
//       });
//     } else {
//       console.error("Cloning failed. Skipping dependency installation.");
//     }
//   });
// } catch (error: any) {
//   console.log(error.message);
// }
