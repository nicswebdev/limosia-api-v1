import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteRateColumnOnPricehSchemaTable1690356629933
  implements MigrationInterface
{
  name = 'DeleteRateColumnOnPricehSchemaTable1690356629933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP COLUMN \`rate\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD \`rate\` varchar(255) NOT NULL`,
    );
  }
}
