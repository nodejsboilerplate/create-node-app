#!/usr/bin/env node

import { spawn } from "child_process";
import { TEMPLATES } from "./templates";
import { select } from "@inquirer/prompts";
import { AppName } from "./modules";
import { execSync } from "node:child_process";
import { setAppPackageName } from "./setAppPackageName";

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

/* ------------------------------------------------------------------------ */
/*                              Template flow                               */
/* ------------------------------------------------------------------------ */
const chosen_template_id = await select({
  message: "Select a template:",
  choices: TEMPLATES.map((template) => ({
    name: template.name,
    value: template.type,
    description: template.description,
  })),
});

const chosen_template = TEMPLATES.find((t) => t.type === chosen_template_id)!;

const app_name = await AppName(validateAppName);

printTemplateHighlights(chosen_template.name, chosen_template.highlights);

async function run() {
  const targetDir = process.cwd();

  try {
    let repo_clone_url: string = "";
    if (chosen_template.type == "ExpressDrizzlePostgres") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres.git";
    }

    if (chosen_template.type == "ExpressDrizzlePostgresInversify") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-inversify.git";
    }

    if (chosen_template.type == "ExpressDrizzlePostgresMicroService") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-microservice.git";
    }

    if (chosen_template.type == "ExpressDrizzlePostgresMonorepo") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-monorepo.git";
    }
    if (chosen_template.type == "MCP") {
      repo_clone_url = "https://github.com/nodejsboilerplate/mcp.git";
    }

    const clone_process = spawn("git", ["clone", repo_clone_url!, targetDir]);

    clone_process.stdout.setEncoding("utf8");
    clone_process.stderr.setEncoding("utf8");
    clone_process.stdout.on("data", (d) => console.log("clone:", d));
    clone_process.stderr.on("data", (d) => console.log("clone err:", d));

    clone_process.on("close", (code) => {
      if (code !== 0) {
        console.error("Cloning failed. Aborting.");
        process.exit(1);
      }

      console.log("Installing dependencies...");
      const install_deps = spawn("pnpm", ["i"], { cwd: targetDir });

      install_deps.stdout.on("data", (d) => console.log(d.toString()));
      install_deps.stderr.on("data", (d) => console.error(d.toString()));

      install_deps.on("close", (installCode) => {
        if (installCode !== 0) {
          console.error("Install failed. Skipping next step.");
          process.exit(1);
        }

        try {
          setAppPackageName(app_name, targetDir);

          console.log("Setup Done.");
          console.log("Running pnpm format...");
          execSync("pnpm format", { cwd: targetDir, stdio: "inherit" });
        } catch (err: any) {
          console.error(err.message);
          process.exit(1);
        }
      });
    });
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

run();
