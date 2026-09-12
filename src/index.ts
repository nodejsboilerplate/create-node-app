#!/usr/bin/env node

import { spawn } from "child_process";
import { Octokit } from "@octokit/core";
import { Settings, type SettingsType } from "./settings.service";
import { TEMPLATES } from "./templates";
import { select, input } from "@inquirer/prompts";
import crypto from "node:crypto";
import {
  AppNameAndRepo,
  AppTypeSetup,
  CodeParadigmSetup,
  CodeQualitySetup,
  DatabaseSetup,
  DocsAndExtraSetup,
  GitTooling,
  LanguageSetup,
  PrebuiltModulesSetup,
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

  settings.applyTemplate(chosen_template.settings);
  await AppNameAndRepo(settings, validateAppName);

  printTemplateHighlights(chosen_template.name, chosen_template.highlights);
} else {
  /* ------------------------------------------------------------------------ */
  /*                              Customize flow                              */
  /* ------------------------------------------------------------------------ */

  /* ------------------------------- App name & type ------------------------ */
  await AppNameAndRepo(settings, validateAppName);

  await AppTypeSetup(settings);

  /* ---------------------------------- Language ----------------------------- */
  await LanguageSetup(settings);

  /* --------------------------------- Database ------------------------------- */
  await DatabaseSetup(settings);

  /* ------------------------------- Git tooling ------------------------------ */
  await GitTooling(settings);

  /* ----------------------------- Prebuilt modules ---------------------------- */
  await PrebuiltModulesSetup(settings);

  /* ------------------------------ Code quality ------------------------------ */
  await CodeQualitySetup(settings);

  /* ------------------------------- Code paradigm ----------------------------- */

  await CodeParadigmSetup(settings);
  /* ------------------------------ Docs & extras ------------------------------ */
  await DocsAndExtraSetup(settings);
}

/* -------------------------------------------------------------------------- */
/*                                   Result                                   */
/* -------------------------------------------------------------------------- */
const finalSettings = settings.getSettings();
console.log(finalSettings);

let keyArr: string[] = [];

Object.entries(finalSettings).map(([key, value]) => {
  if (key !== "app_name") {
    keyArr.push(String(value));
  }
});

const key = keyArr.join("");

const repo_key = crypto.createHash("sha256").update(key).digest("hex");
console.log(repo_key);

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
