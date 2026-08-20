
export type AppType = "express" | "node-http" | "express-serverless" | "nextjs" | "tanstack"
export type RepoStructType = "monolith" | "monorepo"
export type DatabaseType = "mongodb" | "postgres" 
export type DbStructManagerType = "drizzle" | "prisma" | "mongoose" | "mongodb"
export type RedisDriverType = "ioredis" | "redis"
export type RequestLoggerType = "pino" | "morgan"
export type CodeParadigmType = "oop" | "fp"

interface SettingsType {
    app: AppType
    docker_need: boolean
    redis_need: boolean
    redis_driver: RedisDriverType
    database: DatabaseType
    db_struct_manager:  DbStructManagerType
    husky_need: boolean
    commitizen_need: boolean
    repo_struct: RepoStructType
    prebuilt_auth_need: boolean
    prebuilt_user_need: boolean
    prebuilt_reqres_handler_need: boolean
    prebuilt_async_handler_need: boolean
    prebuilt_error_handler_need: boolean
    request_logger_need: boolean
    request_logger_type: RequestLoggerType
    app_rate_limit_need: boolean
    code_paradigm: CodeParadigmType

    setApp(value: AppType): this
    setDockerNeed(value: boolean): this
    setRedisNeed(value: boolean): this
    setRedisDriver(value: RedisDriverType): this
    setDatabase(value: DatabaseType): this
    setDbStructManager(value: DbStructManagerType): this
    setHuskyNeed(value: boolean): this
    setCommitizenNeed(value: boolean): this
    setRepoStruct(value: RepoStructType): this
    setPrebuiltAuthNeed(value: boolean): this
    setPrebuiltUserNeed(value: boolean): this
    setPrebuiltReqresHandlerNeed(value: boolean): this
    setPrebuiltAsyncHandlerNeed(value: boolean): this
    setPrebuiltErrorHandlerNeed(value: boolean): this
    setRequestLoggerNeed(value: boolean): this
    setRequestLoggerType(value: RequestLoggerType): this
    setAppRateLimitNeed(value: boolean): this
    setCodeParadigm(value: CodeParadigmType): this
}

export class Settings implements SettingsType {
    app: AppType = "express"
    docker_need: boolean = false
    redis_need: boolean = true
    redis_driver: RedisDriverType = "redis"
    database: DatabaseType = "postgres"
    db_struct_manager: DbStructManagerType = "drizzle"
    husky_need: boolean = false
    commitizen_need: boolean = false
    repo_struct: RepoStructType = "monolith"
    prebuilt_auth_need: boolean = false
    prebuilt_user_need: boolean = false
    prebuilt_reqres_handler_need: boolean = true
    prebuilt_async_handler_need: boolean = false
    prebuilt_error_handler_need: boolean = true
    request_logger_need: boolean = true
    request_logger_type: RequestLoggerType = "pino"
    app_rate_limit_need: boolean = true
    code_paradigm: CodeParadigmType = "oop"

    setApp(value: AppType): this {
        this.app = value
        return this
    }

    setDockerNeed(value: boolean): this {
        this.docker_need = value
        return this
    }

    setRedisNeed(value: boolean): this {
        this.redis_need = value
        return this
    }

    setRedisDriver(value: RedisDriverType): this {
        this.redis_driver = value
        return this
    }

    setDatabase(value: DatabaseType): this {
        this.database = value
        return this
    }

    setDbStructManager(value: DbStructManagerType): this {
        this.db_struct_manager = value
        return this
    }

    setHuskyNeed(value: boolean): this {
        this.husky_need = value
        return this
    }

    setCommitizenNeed(value: boolean): this {
        this.commitizen_need = value
        return this
    }

    setRepoStruct(value: RepoStructType): this {
        this.repo_struct = value
        return this
    }

    setPrebuiltAuthNeed(value: boolean): this {
        this.prebuilt_auth_need = value
        return this
    }

    setPrebuiltUserNeed(value: boolean): this {
        this.prebuilt_user_need = value
        return this
    }

    setPrebuiltReqresHandlerNeed(value: boolean): this {
        this.prebuilt_reqres_handler_need = value
        return this
    }

    setPrebuiltAsyncHandlerNeed(value: boolean): this {
        this.prebuilt_async_handler_need = value
        return this
    }

    setPrebuiltErrorHandlerNeed(value: boolean): this {
        this.prebuilt_error_handler_need = value
        return this
    }

    setRequestLoggerNeed(value: boolean): this {
        this.request_logger_need = value
        return this
    }

    setRequestLoggerType(value: RequestLoggerType): this {
        this.request_logger_type = value
        return this
    }

    setAppRateLimitNeed(value: boolean): this {
        this.app_rate_limit_need = value
        return this
    }

    setCodeParadigm(value: CodeParadigmType): this {
        this.code_paradigm = value
        return this
    }
}