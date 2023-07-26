import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropEmailPasswordFieldOnGuestsTable1690211178527
  implements MigrationInterface
{
  name = 'DropEmailPasswordFieldOnGuestsTable1690211178527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_85d472bf0e9dd55ce9a8268c3e\` ON \`guests\``,
    );
    await queryRunner.query(`ALTER TABLE \`guests\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`guests\` DROP COLUMN \`password\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`guests\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_85d472bf0e9dd55ce9a8268c3e\` ON \`guests\` (\`email\`)`,
    );
  }
}
