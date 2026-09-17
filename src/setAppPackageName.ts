import fs from "node:fs";
import path from "node:path";

export function setAppPackageName(app_name: string, targetDir: string) {
  const pkgPath = path.join(targetDir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.warn(
      `package.json not found at ${pkgPath} - skipping name update.`
    );
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = app_name;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
}
