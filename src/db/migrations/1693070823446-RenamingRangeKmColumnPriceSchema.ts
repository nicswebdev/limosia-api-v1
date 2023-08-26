import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamingRangeKmColumnPriceSchema1693070823446
  implements MigrationInterface
{
  name = 'RenamingRangeKmColumnPriceSchema1693070823446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` CHANGE \`range_km\` \`from_range_km\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` CHANGE \`from_range_km\` \`range_km\` int NOT NULL DEFAULT '0'`,
    );
  }
}
