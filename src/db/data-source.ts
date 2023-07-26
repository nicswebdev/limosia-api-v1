import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main.seeder';

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js', `${__dirname}/**/*.entity.{ts,js}`],
  migrations: ['dist/db/migrations/*.js'],
  // seeds: ['src/db/seeds/**/*{.ts, .js}'],
  // factories: ['src/db/factories/**/*{.ts, .js}'],
  seeds: [MainSeeder],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
