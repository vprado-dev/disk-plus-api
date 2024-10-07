declare namespace NodeJS {
  export interface ProcessEnv {
    // Enviroment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;

    // Api
    API_NAME: string;
    API_TOKEN: string;

    // Docker
    DOCKER_IMAGE: string;

    // Database
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;

    // Root user
    ROOT_NAME: string;
    ROOT_EMAIL: string;
    ROOT_PASSWORD: string;

    // JWT
    JWT_SECRET: string;
    TOKEN_LIFE: string;
  }
}
