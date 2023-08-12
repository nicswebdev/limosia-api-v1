import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager, runSeeders } from 'typeorm-extension';
import CreateRoleSeeder from './create-roles.seeder';
import CreateUsersAdminSeeder from './create-users-admin.seeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [CreateRoleSeeder, CreateUsersAdminSeeder],
    });
  }
}
