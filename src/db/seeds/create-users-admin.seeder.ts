import { DataSource, DeepPartial } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Guests, UserRole, Users } from '../models';

export default class CreateUsersAdminSeeder implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(Users);
    const guestRepository = dataSource.getRepository(Guests);
    const userRoleRepository = dataSource.getRepository(UserRole);

    const users: DeepPartial<Users>[] = [
      {
        email: 'super@admin.com',
        password: 'superadmin@@@',
        f_name: 'Super',
        l_name: 'Admin',
      },
    ];

    const newUsers = userRepository.create(users);
    const savedUser = await userRepository.save(newUsers);

    const guests: DeepPartial<Guests>[] = [
      {
        user: savedUser[0].id,
      },
    ];

    const newGuest = guestRepository.create(guests);
    await guestRepository.save(newGuest);

    const userRoles: DeepPartial<UserRole>[] = [
      {
        user: savedUser[0].id,
        role: 1,
      },
    ];

    const newUserRole = userRoleRepository.create(userRoles);
    await userRoleRepository.save(newUserRole);
  }
}
