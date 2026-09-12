import fs from "node:fs";
import path from "node:path";
import type { Settings } from "./settings.service";

export function setAppPackageName(settings: Settings, targetDir: string) {
  const pkgPath = path.join(targetDir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.warn(`package.json not found at ${pkgPath} - skipping name update.`);
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = settings.app_name;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log(`Updated package.json name -> ${settings.app_name}`);
}