#!/usr/bin/env node

import { spawn } from "child_process";
import { Octokit } from "@octokit/core";
import {
  Settings,
  type SettingsType,
} from "./settings.service";
import { TEMPLATES } from "./templates";
import { select, input } from "@inquirer/prompts";
import {
  AppNameAndType,
  CodeParadigmSetup,
  CodeQualitySetup,
  DatabaseSetup,
  DockerSetup,
  DocsAndExtraSetup,
  GitTooling,
  LanguageSetup,
  LoggingSetup,
  PrebuiltModulesSetup,
  RateLimitSetup,
  RedisSetup,
} from "./modules";

const settings = new Settings();
const octokit = new Octokit();

const validateAppName = (value: string) => {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "Name cannot be empty";
  }

  // Disallow any whitespace (spaces, tabs, etc.) anywhere in the name
  if (/\s/.test(trimmed)) {
    return "Name cannot contain spaces";
  }

  // Disallow reserved/invalid filesystem characters
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
  if (invalidChars.test(trimmed)) {
    return 'Name contains invalid characters (< > : " / \\ | ? *)';
  }

  // Disallow leading/trailing dots
  if (/^\.|\.$/.test(trimmed)) {
    return "Name cannot start or end with a dot";
  }

  // Disallow reserved Windows names
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[0-9]|LPT[0-9])$/i;
  if (reservedNames.test(trimmed)) {
    return "This name is reserved by the operating system";
  }

  // Enforce reasonable length
  if (trimmed.length > 214) {
    return "Name is too long";
  }

  return true;
};

const printTemplateHighlights = (name: string, highlights: string[]) => {
  console.log(`\n✔ ${name}\n`);
  for (const line of highlights) {
    console.log(`  • ${line}`);
  }
  console.log("");
};

const printFriendlySummary = (s: SettingsType) => {
  console.log(`\nHere's what "${s.app_name}" is getting:\n`);

  console.log(`  Project`);
  console.log(
    `    • App type: ${s.app}${s.typescript_need ? " (TypeScript)" : ""}`
  );
  console.log(
    `    • Structure: ${s.repo_struct}${
      s.monorepo_provider ? ` (${s.monorepo_provider})` : ""
    }`
  );
  console.log(`    • Docker: ${s.docker_need ? "yes" : "no"}`);

  console.log(`  Data`);
  console.log(`    • Database: ${s.database} (${s.db_struct_manager})`);
  console.log(
    `    • Redis: ${s.redis_need ? `yes (${s.redis_driver})` : "no"}`
  );

  console.log(`  Modules`);
  console.log(
    `    • Auth: ${s.prebuilt_auth_need ? "included" : "not included"}`
  );
  console.log(
    `    • User module: ${s.prebuilt_user_need ? "included" : "not included"}`
  );
  console.log(
    `    • Monitoring: ${
      s.monitoring_need
        ? s.automate_monitoring_setup
          ? "yes, auto-configured"
          : "yes, scaffolded only"
        : "no"
    }`
  );

  console.log(`  Quality`);
  console.log(
    `    • Linting/formatting: ${
      [s.eslint_need && "ESLint", s.prettier_need && "Prettier"]
        .filter(Boolean)
        .join(", ") || "none"
    }`
  );
  console.log(`    • Tests: ${s.unit_tester_need ? "yes" : "no"}`);
  console.log(
    `    • Git hooks/CI: ${s.which_git_workflows.length > 0 ? "configured" : "none"}`
  );
  console.log(
    `    • API docs: ${
      s.openapi_spec_need
        ? `OpenApi${s.swagger_ui_need ? " + interactive UI" : " spec only"}`
        : s.openapi_spec_need
          ? "OpenAPI spec"
          : "none"
    }`
  );
};

/* -------------------------------------------------------------------------- */
/*                          Step 0 — template or custom                       */
/* -------------------------------------------------------------------------- */
const get_setup_mode = await select({
  message: "How do you want to set up your project?",
  choices: [
    {
      name: "Use a ready-made template",
      value: "template",
      description: "Pick a preconfigured stack, no questions asked",
    },
    {
      name: "Customize settings myself",
      value: "custom",
      description: "Answer questions to build your own configuration",
    },
  ],
  default: "template",
});

if (get_setup_mode === "template") {
  /* ------------------------------------------------------------------------ */
  /*                              Template flow                               */
  /* ------------------------------------------------------------------------ */
  const chosen_template_id = await select({
    message: "Select a template:",
    choices: TEMPLATES.map((template) => ({
      name: template.name,
      value: template.id,
      description: template.description,
    })),
  });

  const chosen_template = TEMPLATES.find((t) => t.id === chosen_template_id)!;

  settings.setAppName(
    await input({
      message: "Enter app name:",
      validate: validateAppName,
    })
  );

  settings.applyTemplate(chosen_template.settings);

  printTemplateHighlights(chosen_template.name, chosen_template.highlights);
} else {
  /* ------------------------------------------------------------------------ */
  /*                              Customize flow                              */
  /* ------------------------------------------------------------------------ */

  /* ------------------------------- App name & type ------------------------ */
  await AppNameAndType(settings, validateAppName);

  /* ---------------------------------- Language ----------------------------- */
  await LanguageSetup(settings);

  /* ---------------------------------- Docker -------------------------------- */
  await DockerSetup(settings);
  /* --------------------------------- Database ------------------------------- */
  await DatabaseSetup(settings);

  /* ---------------------------------- Redis --------------------------------- */

  await RedisSetup(settings);
  /* ------------------------------ Code quality ------------------------------ */
  await CodeQualitySetup(settings);

  /* ------------------------------- Git tooling ------------------------------ */
  await GitTooling(settings);

  /* ----------------------------- Prebuilt modules ---------------------------- */
  await PrebuiltModulesSetup(settings);

  /* --------------------------------- Logging -------------------------------- */
  await LoggingSetup(settings);

  /* ------------------------------- Rate limiting ----------------------------- */

  await RateLimitSetup(settings);
  /* ------------------------------- Code paradigm ----------------------------- */

  await CodeParadigmSetup(settings);
  /* ------------------------------ Docs & extras ------------------------------ */
  await DocsAndExtraSetup(settings);
}

/* -------------------------------------------------------------------------- */
/*                                   Result                                   */
/* -------------------------------------------------------------------------- */
const finalSettings = settings.getSettings();
printFriendlySummary(finalSettings);
console.log(settings.getSettings());

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
