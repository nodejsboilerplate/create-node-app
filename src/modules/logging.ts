import { RequestLoggerType, type Settings } from "@/settings.service";
import { confirm, select } from "@inquirer/prompts";

export const LoggingSetup = async (settings: Settings) => {
  const get_request_logger_need = await confirm({
    message: "Do you need request logging?",
    default: true,
  });
  settings.setRequestLoggerNeed(get_request_logger_need);

  if (settings.request_logger_need) {
    const get_request_logger_type = await select({
      message: "Select request logger:",
      choices: [
        { name: "Pino", value: RequestLoggerType.Pino },
        { name: "Morgan", value: RequestLoggerType.Morgan },
      ],
      default: RequestLoggerType.Pino,
    });
    settings.setRequestLoggerType(get_request_logger_type);
  }

  const get_monitoring_need = await confirm({
    message: "Do you need monitoring/observability (health checks, metrics)?",
    default: false,
  });
  settings.setMonitoringNeed(get_monitoring_need);

  if (settings.monitoring_need) {
    const get_automate_monitoring_setup = await confirm({
      message:
        "Automatically provision the monitoring setup (dashboards/alerts wired up for you), instead of just scaffolding config to wire up yourself?",
      default: false,
    });
    settings.setAutomateMonitoringSetup(get_automate_monitoring_setup);
  }
};
