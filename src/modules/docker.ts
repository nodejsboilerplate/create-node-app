import type { Settings } from "@/settings.service";
import { confirm } from "@inquirer/prompts";

export const DockerSetup = async (settings: Settings) => {
  const get_docker_need = await confirm({
    message: "Do you need Docker setup?",
    default: false,
  });
  settings.setDockerNeed(get_docker_need);
};
