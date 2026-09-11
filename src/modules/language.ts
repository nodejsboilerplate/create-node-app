import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";
import chalk from "chalk";

export const LanguageSetup = async (settings: Settings) => {
  const get_typescript_need = await confirm({
    message: "Use TypeScript for the generated project?",
    default: true,
  });
  if (!get_typescript_need) {
    console.warn(
      chalk.yellow(
        "\n" +
          chalk.white.bold.bgYellow("Warn:") +
          " JavaScript is not supported yet - proceeding with TypeScript.\n"
      )
    );
  }

  settings.setTypescriptNeed(true);
};
