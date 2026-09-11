import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const CodeQualitySetup = async (settings: Settings) => {
  const get_eslint_need = await confirm({
    message: "Do you need ESLint?",
    default: true,
  });
  settings.setEslintNeed(get_eslint_need);

  const get_prettier_need = await confirm({
    message: "Do you need Prettier?",
    default: true,
  });
  settings.setPrettierNeed(get_prettier_need);

  const get_unit_tester_need = await confirm({
    message: "Do you need a unit testing setup (e.g. Vitest/Jest)?",
    default: true,
  });
  settings.setUnitTesterNeed(get_unit_tester_need);
};
