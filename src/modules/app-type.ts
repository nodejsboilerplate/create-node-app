import { AppType, type Settings } from "@/settings.service";
import { select } from "@inquirer/prompts";

export const AppTypeSetup = async (settings: Settings) => {
  const get_app = await select({
    message: "Select app type:",
    choices: [
      { name: "Express", value: AppType.Express },
      { name: "Node HTTP", value: AppType.NodeHttp, disabled: true },
      {
        name: "Express Serverless",
        value: AppType.ExpressServerless,
        disabled: true,
      },
      { name: "Next.js", value: AppType.NextJs, disabled: true },
      { name: "TanStack", value: AppType.TanStack, disabled: true },
    ],
    default: AppType.Express,
  });
  settings.setApp(get_app);
};
