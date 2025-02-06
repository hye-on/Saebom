import { defineConfig } from '@mikro-orm/postgresql';
import { LoadStrategy, UnderscoreNamingStrategy } from '@mikro-orm/core';
import * as entities from './entities';
export default defineConfig({
  host: 'localhost',
  port: 5432,
  user: 'saebom_admin',
  password: 'saebom1234',
  dbName: 'saebom',
  entities: Object.values(entities),
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  namingStrategy: UnderscoreNamingStrategy,
  allowGlobalContext: true,
  migrations: {
    path: './src/database/migrations',
    pathTs: './src/database/migrations',
    glob: '!(*.d).{js,ts}',
  },
});
