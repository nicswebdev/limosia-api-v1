import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKUserToGuestsTableAndDropNameField1690211350902
  implements MigrationInterface
{
  name = 'AddFKUserToGuestsTableAndDropNameField1690211350902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`guests\` DROP COLUMN \`f_name\``);
    await queryRunner.query(`ALTER TABLE \`guests\` DROP COLUMN \`l_name\``);
    await queryRunner.query(`ALTER TABLE \`guests\` ADD \`user_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`guests\` ADD UNIQUE INDEX \`IDX_3200408b8709b1d26efa9a0979\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_3200408b8709b1d26efa9a0979\` ON \`guests\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` ADD CONSTRAINT \`FK_3200408b8709b1d26efa9a09794\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`guests\` DROP FOREIGN KEY \`FK_3200408b8709b1d26efa9a09794\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_3200408b8709b1d26efa9a0979\` ON \`guests\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` DROP INDEX \`IDX_3200408b8709b1d26efa9a0979\``,
    );
    await queryRunner.query(`ALTER TABLE \`guests\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`guests\` ADD \`l_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` ADD \`f_name\` varchar(255) NOT NULL`,
    );
  }
}
