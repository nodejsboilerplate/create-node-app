import {
  MonorepoProviderType,
  RepoStructType,
  type Settings,
} from "@/settings.service";
import { input, select } from "@inquirer/prompts";

export const AppNameAndRepo = async (
  settings: Settings,
  validateAppName: (data: string) => boolean | string
) => {
  const get_repo_type = await select({
    message: "Select a repository structure:",
    choices: [
      {
        name: "Monolith",
        value: RepoStructType.Monolith,
        description: "Single deployable app, one codebase",
      },
      {
        name: "Monorepo",
        value: RepoStructType.Monorepo,
        description: "Multiple apps/packages in one repo",
      },
    ],
    default: RepoStructType.Monolith,
  });
  settings.setRepoStruct(get_repo_type);

  if (settings.repo_struct === RepoStructType.Monorepo) {
    const get_monorepo_provider = await select({
      message: "Select monorepo provider:",
      choices: [
        { name: "None", value: null },
        { name: "Turborepo", value: MonorepoProviderType.Turborepo },
      ],
      default: null,
    });
    if (get_monorepo_provider) {
      settings.setMonorepoProvider(get_monorepo_provider);
    }
  }

  settings.setAppName(
    await input({
      message:
        settings.repo_struct === RepoStructType.Monolith
          ? "Enter app name:"
          : "Enter apps repository name:",
      validate: validateAppName,
    })
  );
};
