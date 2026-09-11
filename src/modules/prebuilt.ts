import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const PrebuiltModulesSetup = async (settings: Settings) => {
  const get_prebuilt_auth_need = await confirm({
    message: "Include prebuilt auth module?",
    default: false,
  });
  settings.setPrebuiltAuthNeed(get_prebuilt_auth_need);

  const get_prebuilt_user_need = await confirm({
    message: "Include prebuilt user module?",
    default: false,
  });
  settings.setPrebuiltUserNeed(get_prebuilt_user_need);
};
