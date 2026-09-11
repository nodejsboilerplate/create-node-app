import { RedisDriverType, type Settings } from "@/settings.service";
import { confirm, select } from "@inquirer/prompts";

export const RedisSetup = async (settings: Settings) => {
  const get_redis_need = await confirm({
    message: "Do you need Redis?",
    default: true,
  });
  settings.setRedisNeed(get_redis_need);

  if (settings.redis_need) {
    const get_redis_driver = await select({
      message: "Select Redis driver:",
      choices: [
        { name: "ioredis", value: RedisDriverType.IORedis },
        { name: "redis", value: RedisDriverType.Redis },
      ],
      default: RedisDriverType.Redis,
    });
    settings.setRedisDriver(get_redis_driver);
  }
};
