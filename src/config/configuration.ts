export interface DatabaseConfig {
  database?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
}

const configs = (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});

export default configs;
