import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropGuestIdOnOrdersTable1691902302173
  implements MigrationInterface
{
  name = 'DropGuestIdOnOrdersTable1691902302173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_4a7d03c27412dbfb47ac912b3e3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_4a7d03c27412dbfb47ac912b3e\` ON \`orders\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`guest_id\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`guest_id\` int NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_4a7d03c27412dbfb47ac912b3e\` ON \`orders\` (\`guest_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_4a7d03c27412dbfb47ac912b3e3\` FOREIGN KEY (\`guest_id\`) REFERENCES \`guests\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
