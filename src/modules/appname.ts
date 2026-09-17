import { input } from "@inquirer/prompts";

export const AppName = async (
  validateAppName: (data: string) => boolean | string
) => {
  return await input({
    message: "Enter package name: ",
    validate: validateAppName,
  });
};
