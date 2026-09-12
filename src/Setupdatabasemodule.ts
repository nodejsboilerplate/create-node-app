import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { TableType, type Settings } from "./settings.service";

const DB_REPO_URL = "https://github.com/nodejsboilerplate/database";

function resolveVariantFolder(settings: Settings): string | null {
  const hasAddress = settings.selected_tables.includes(TableType.UserAddresses);
  const hasContact = settings.selected_tables.includes(TableType.UserContacts);

  if (!hasAddress && !hasContact) return "without-addr-contact";
  if (hasAddress && !hasContact) return "without-contact";
  if (!hasAddress && hasContact) return "without-addr";
  // both selected -> cloned repo's default setup already has everything, do nothing
  return null;
}

function sparseCloneDatabase(sparsePath: string, tempDir: string) {
  fs.mkdirSync(tempDir, { recursive: true });

  execSync("git init", { cwd: tempDir, stdio: "inherit" });
  execSync(`git remote add -f origin ${DB_REPO_URL}`, { cwd: tempDir, stdio: "inherit" });
  execSync("git config core.sparseCheckout true", { cwd: tempDir, stdio: "inherit" });

  fs.writeFileSync(
    path.join(tempDir, ".git", "info", "sparse-checkout"),
    sparsePath + "\n",
    "utf8"
  );

  try {
    execSync("git pull origin main", { cwd: tempDir, stdio: "inherit" });
  } catch {
    execSync("git pull origin master", { cwd: tempDir, stdio: "inherit" });
  }
}

export function setupDatabaseModule(settings: Settings, targetDir: string) {
  const destDatabaseDir = path.join(targetDir, "src", "database");

  if (!settings.prebuilt_user_need) {
    if (fs.existsSync(destDatabaseDir)) {
      fs.rmSync(destDatabaseDir, { recursive: true, force: true });
      console.log("Prebuilt user module not selected - removed database folder.");
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

  sparseCloneDatabase(sparsePath, tempDir);

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