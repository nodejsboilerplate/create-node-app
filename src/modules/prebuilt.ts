import { Settings, TableType } from "@/settings.service";
import { confirm, checkbox } from "@inquirer/prompts";

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

  if (get_prebuilt_user_need) {
    const selected_tables = await checkbox({
      message: "Select tables",
      choices: [
        { name: "user_addresses", value: TableType.UserAddresses },
        { name: "user_contacts", value: TableType.UserContacts },
      ],
    });
    settings.setSelectedTables(selected_tables);
  }
};
