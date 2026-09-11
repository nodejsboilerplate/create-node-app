import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const RateLimitSetup = async (settings: Settings) => {
  const get_app_rate_limit_need = await confirm({
    message: "Enable app rate limiting?",
    default: true,
  });
  settings.setAppRateLimitNeed(get_app_rate_limit_need);
};
