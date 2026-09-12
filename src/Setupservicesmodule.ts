import fs from "node:fs";
import path from "node:path";
import type { Settings } from "./settings.service";
import { resolveVariantFolder, sparseCloneRepo } from "@/utils";

const SERVICES_REPO_URL = "https://github.com/nodejsboilerplate/services.git";

export function setupServicesModule(settings: Settings, targetDir: string) {
  const destServicesDir = path.join(targetDir, "src", "services");

  if (!settings.prebuilt_user_need) {
    if (fs.existsSync(destServicesDir)) {
      fs.rmSync(destServicesDir, { recursive: true, force: true });
      console.log(
        "Prebuilt user module not selected — removed services folder."
      );
    }
    return;
  }

  const variantFolder = resolveVariantFolder(settings);

  if (variantFolder === null) {
    console.log(
      "Full table set selected — using default cloned services setup, skipping override."
    );
    return;
  }

  // Assumes each variant folder contains a "services" subfolder, mirroring
  // the database repo's layout. Confirm against the actual repo structure.
  const sparsePath = `default/${variantFolder}/services`;
  const tempDir = path.join(targetDir, "__services-sparse-checkout__");

  console.log(`Fetching services variant: ${variantFolder}`);

  sparseCloneRepo(SERVICES_REPO_URL, sparsePath, tempDir);

  const sparseServicesDir = path.join(tempDir, sparsePath);

  if (!fs.existsSync(sparseServicesDir)) {
    throw new Error(
      `Sparse checkout succeeded but expected path not found: ${sparseServicesDir}`
    );
  }

  if (fs.existsSync(destServicesDir)) {
    fs.rmSync(destServicesDir, { recursive: true, force: true });
  }

  fs.cpSync(sparseServicesDir, destServicesDir, { recursive: true });
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(
    `Services module (${variantFolder}) installed at ${destServicesDir}`
  );
}
