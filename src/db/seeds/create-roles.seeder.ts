import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../models';

export default class CreateRoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);
    const roles = [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ];

    const newRoles = roleRepository.create(roles);
    await roleRepository.save(newRoles);
  }
}
