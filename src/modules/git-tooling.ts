import {  Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const GitTooling = async (settings: Settings) => {
  const get_husky_need = await confirm({
    message: "Do you need Husky (git hooks)?",
    default: false,
  });
  settings.setHuskyNeed(get_husky_need);

};
