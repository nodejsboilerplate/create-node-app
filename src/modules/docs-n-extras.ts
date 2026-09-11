import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const DocsAndExtraSetup = async (settings: Settings) => {
  const get_email_templates_need = await confirm({
    message: "Include email templates?",
    default: false,
  });
  settings.setEmailTemplatesNeed(get_email_templates_need);
};
