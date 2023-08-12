import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../models';
import { RolesEnum } from '../../common/enums';

export default class CreateRoleSeeder implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);
    const roles = [
      {
        name: RolesEnum.ADMIN,
      },
      {
        name: RolesEnum.USER,
      },
    ];

    const newRoles = roleRepository.create(roles);
    await roleRepository.save(newRoles);
  }
}
