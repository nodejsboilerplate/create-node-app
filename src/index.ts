#!/usr/bin/env node

import { spawn } from "child_process";
import { TEMPLATES } from "./templates";
import { select } from "@inquirer/prompts";
import fs from "fs";
import path from "path";
import { execSync } from "node:child_process";

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
    disabled:
      template.type === "ExpressDrizzlePostgresMicroService"
        ? "(coming soon)"
        : false,
  })),
});

const chosen_template = TEMPLATES.find((t) => t.type === chosen_template_id)!;

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

    if (chosen_template.type == "ExpressDrizzlePostgresMonorepo") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-monorepo.git";
    }

    if (chosen_template.type == "MCP") {
      repo_clone_url = "https://github.com/nodejsboilerplate/mcp.git";
    }

    if (chosen_template.type == "ExpressDrizzlePostgresEmpty") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-empty.git";
    }

    if (chosen_template.type == "ExpressDrizzlePostgresInversifyEmpty") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-inversify-empty.git";
    }

    if (chosen_template.type == "ExpressDrizzlePostgresMonorepoEmpty") {
      repo_clone_url =
        "https://github.com/nodejsboilerplate/express-drizzle-postgres-monorepo-empty.git";
    }

    const clone_process = spawn("git", ["clone", repo_clone_url!, targetDir]);

    clone_process.stdout.setEncoding("utf8");
    clone_process.stderr.setEncoding("utf8");
    clone_process.stdout.on("data", (d) => console.log("clone:", d));
    clone_process.stderr.on("data", (d) => console.log("clone:", d));

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


          fs.rmSync(path.join(targetDir, ".git"), {
            recursive: true,
            force: true,
          });

          console.log("Setup Done.");
          console.log("Building necessary files to continue...");

          if (chosen_template.type == "ExpressDrizzlePostgres") {
            execSync("pnpm --filter emails run build", {
              cwd: targetDir,
              stdio: "inherit",
            });
          }

          if (chosen_template.type == "ExpressDrizzlePostgresInversify") {
            execSync("pnpm --filter emails run build", {
              cwd: targetDir,
              stdio: "inherit",
            });
          }

          if (chosen_template.type == "ExpressDrizzlePostgresMicroService") {
            execSync("pnpm --filter './packages/*' run build", {
              cwd: targetDir,
              stdio: "inherit",
            });
          }

          if (chosen_template.type == "ExpressDrizzlePostgresMonorepo") {
            execSync("pnpm --filter './packages/*' run build", {
              cwd: targetDir,
              stdio: "inherit",
            });
          }
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
