namespace NodeJS{
    interface  ProcessEnv{
        //DATABASE
        DB_PORT: number
        DB_HOST: string
        DB_NAME: string
        DB_USERNAME: string
        DB_PASSWORD: string


        PORT:number

        //TOKEN
        ACCESS_TOKEN_SECRET:string
        ACCESS_TOKEN_EXPIRES_IN:string
        REFRESH_TOKEN_SECRET:string
        REFRESH_TOKEN_EXPIRES_IN:string
    }
}