import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager, runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '../data-source';
import CreateRoleSeeder from './create-roles.seeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [CreateRoleSeeder],
    });
  }
}
