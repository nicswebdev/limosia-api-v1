import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserTableToUsers1689750607616 implements MigrationInterface {
  name = 'ChangeUserTableToUsers1689750607616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` RENAME TO \`users\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` RENAME TO \`user\``);
  }
}
