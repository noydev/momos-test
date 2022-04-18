export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  GLOBAL_PREFIX: process.env.GLOBAL_PREFIX || 'api',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,

  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'test',
  DB_DATABASE: process.env.DB_DATABASE || 'test',

  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6397,
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'very_secret',
});
