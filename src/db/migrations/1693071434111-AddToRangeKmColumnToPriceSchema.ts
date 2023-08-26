import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddToRangeKmColumnToPriceSchema1693071434111
  implements MigrationInterface
{
  name = 'AddToRangeKmColumnToPriceSchema1693071434111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD \`to_range_km\` int NOT NULL DEFAULT '0' AFTER \`from_range_km\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP COLUMN \`to_range_km\``,
    );
  }
}
