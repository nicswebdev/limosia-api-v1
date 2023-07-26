import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropRoleFieldOnUsersTable1690210605634
  implements MigrationInterface
{
  name = 'DropRoleFieldOnUsersTable1690210605634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`,
    );
  }
}
