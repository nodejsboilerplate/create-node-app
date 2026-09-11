import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const DocsAndExtraSetup = async (settings: Settings) => {
  const get_openapi_spec_need = await confirm({
    message: "Generate an OpenAPI spec?",
    default: false,
  });
  settings.setOpenapiSpecNeed(get_openapi_spec_need);

  if (settings.openapi_spec_need) {
    const get_swagger_ui_need = await confirm({
      message:
        "Do you need Swagger UI (an interactive docs page for that spec)?",
      default: true,
    });
    settings.setSwaggerUiNeed(get_swagger_ui_need);
  }

  const get_technical_doc_need = await confirm({
    message: "Generate technical documentation (README, architecture doc)?",
    default: false,
  });
  settings.setTechnicalDocNeed(get_technical_doc_need);

  const get_email_templates_need = await confirm({
    message: "Include email templates?",
    default: false,
  });
  settings.setEmailTemplatesNeed(get_email_templates_need);
};
