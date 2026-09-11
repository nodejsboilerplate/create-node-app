import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const CodeQualitySetup = async (settings: Settings) => {
  const get_unit_tester_need = await confirm({
    message: "Do you need a unit testing setup (e.g. Vitest/Jest)?",
    default: true,
  });
  settings.setUnitTesterNeed(get_unit_tester_need);
};
