import fs from "node:fs";
import path from "node:path";
import type { Settings } from "./settings.service";
import { resolveVariantFolder, sparseCloneRepo } from "@/utils";

const DB_REPO_URL = "https://github.com/nodejsboilerplate/database";

export function setupDatabaseModule(settings: Settings, targetDir: string) {
  const destDatabaseDir = path.join(targetDir, "src", "database");

  if (!settings.prebuilt_user_need) {
    if (fs.existsSync(destDatabaseDir)) {
      fs.rmSync(destDatabaseDir, { recursive: true, force: true });
      console.log("Prebuilt user module not selected — removed database folder.");
    }
    return;
  }

  const variantFolder = resolveVariantFolder(settings);

  if (variantFolder === null) {
    console.log("Full table set selected — using default cloned database setup, skipping override.");
    return;
  }

  const sparsePath = `default/drizzle/postgres/${variantFolder}/database`;
  const tempDir = path.join(targetDir, "__db-sparse-checkout__");

  console.log(`Fetching database variant: ${variantFolder}`);

  sparseCloneRepo(DB_REPO_URL, sparsePath, tempDir);

  const sparseDatabaseDir = path.join(tempDir, sparsePath);

  if (!fs.existsSync(sparseDatabaseDir)) {
    throw new Error(
      `Sparse checkout succeeded but expected path not found: ${sparseDatabaseDir}`
    );
  }

  if (fs.existsSync(destDatabaseDir)) {
    fs.rmSync(destDatabaseDir, { recursive: true, force: true });
  }

  fs.cpSync(sparseDatabaseDir, destDatabaseDir, { recursive: true });
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`Database module (${variantFolder}) installed at ${destDatabaseDir}`);
}