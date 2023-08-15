import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRangeKmColumnTypeToIntegerOrdersTable1692110329347
  implements MigrationInterface
{
  name = 'ChangeRangeKmColumnTypeToIntegerOrdersTable1692110329347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`range\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`range\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`range\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`range\` varchar(255) NOT NULL`,
    );
  }
}
