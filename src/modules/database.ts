import {
  DatabaseType,
  DbStructManagerType,
  type Settings,
} from "@/settings.service";
import { select } from "@inquirer/prompts";

export const DatabaseSetup = async (settings: Settings) => {
  const get_database = await select({
    message: "Select database:",
    choices: [
      { name: "MongoDB", value: DatabaseType.MongoDB },
      { name: "PostgreSQL", value: DatabaseType.Postgres },
    ],
    default: DatabaseType.Postgres,
  });
  settings.setDatabase(get_database);

  const dbStructManagerChoices =
    get_database === DatabaseType.MongoDB
      ? [
          { name: "Mongoose", value: DbStructManagerType.Mongoose },
          { name: "MongoDB (raw driver)", value: DbStructManagerType.MongoDB },
          { name: "Prisma", value: DbStructManagerType.Prisma },
        ]
      : [
          { name: "Drizzle", value: DbStructManagerType.Drizzle },
          { name: "Prisma", value: DbStructManagerType.Prisma },
        ];

  const get_db_struct_manager = await select({
    message: "Select ORM/ODM/driver:",
    choices: dbStructManagerChoices,
    default: dbStructManagerChoices[0]?.value,
  });
  settings.setDbStructManager(get_db_struct_manager);
};
