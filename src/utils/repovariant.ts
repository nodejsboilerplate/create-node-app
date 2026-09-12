import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { TableType, type Settings } from "@/settings.service";

export function resolveVariantFolder(settings: Settings): string | null {
  const hasAddress = settings.selected_tables.includes(TableType.UserAddresses);
  const hasContact = settings.selected_tables.includes(TableType.UserContacts);

  if (!hasAddress && !hasContact) return "without-addr-contact";
  if (hasAddress && !hasContact) return "without-contact";
  if (!hasAddress && hasContact) return "without-addr";
  // both selected -> cloned repo's default setup already has everything, do nothing
  return null;
}

export function sparseCloneRepo(repoUrl: string, sparsePath: string, tempDir: string) {
  fs.mkdirSync(tempDir, { recursive: true });

  execSync("git init", { cwd: tempDir, stdio: "inherit" });
  execSync(`git remote add -f origin ${repoUrl}`, { cwd: tempDir, stdio: "inherit" });
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