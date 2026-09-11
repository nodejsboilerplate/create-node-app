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

  const get_prebuilt_reqres_handler_need = await confirm({
    message: "Include prebuilt request/response handler?",
    default: true,
  });
  settings.setPrebuiltReqresHandlerNeed(get_prebuilt_reqres_handler_need);

  const get_prebuilt_async_handler_need = await confirm({
    message: "Include prebuilt async handler wrapper?",
    default: false,
  });
  settings.setPrebuiltAsyncHandlerNeed(get_prebuilt_async_handler_need);

  const get_prebuilt_error_handler_need = await confirm({
    message: "Include prebuilt error handler?",
    default: true,
  });
  settings.setPrebuiltErrorHandlerNeed(get_prebuilt_error_handler_need);

  const get_validator_need = await confirm({
    message: "Include request validation (e.g. Zod schemas)?",
    default: true,
  });
  settings.setValidatorNeed(get_validator_need);

  const get_response_handler_need = await confirm({
    message: "Include a standardized API response handler?",
    default: true,
  });
  settings.setResponseHandlerNeed(get_response_handler_need);
};
