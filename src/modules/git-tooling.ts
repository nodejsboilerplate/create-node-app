import { GitWorkflowType, Settings } from "@/settings.service";
import { checkbox, confirm } from "@inquirer/prompts";

export const GitTooling = async (settings: Settings) => {
  const get_husky_need = await confirm({
    message: "Do you need Husky (git hooks)?",
    default: false,
  });
  settings.setHuskyNeed(get_husky_need);

  const get_commitizen_need = await confirm({
    message: "Do you need Commitizen (conventional commits)?",
    default: false,
  });
  settings.setCommitizenNeed(get_commitizen_need);

  const get_commitlint_need = await confirm({
    message: "Do you need commitlint?",
    default: false,
  });
  settings.setCommitlintNeed(get_commitlint_need);

  const get_git_workflows = await checkbox({
    message: "Select git/CI workflows to include:",
    choices: [
      { name: "PR Linter", value: GitWorkflowType.PrLinter },
      { name: "Application Deploy", value: GitWorkflowType.ApplicationDeploy },
      { name: "Git Tag Releaser", value: GitWorkflowType.GitTagReleaser },
      { name: "Tech Reference Doc", value: GitWorkflowType.TechReferenceDoc },
      { name: "All of the above", value: GitWorkflowType.All },
    ],
  });
  settings.setWhichGitWorkflows(
    get_git_workflows.includes(GitWorkflowType.All)
      ? [GitWorkflowType.All]
      : get_git_workflows
  );
};
