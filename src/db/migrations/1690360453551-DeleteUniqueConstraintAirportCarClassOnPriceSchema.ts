import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteUniqueConstraintAirportCarClassOnPriceSchema1690360453551
  implements MigrationInterface
{
  name = 'DeleteUniqueConstraintAirportCarClassOnPriceSchema1690360453551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP FOREIGN KEY \`FK_96d83fdc6beaf5e79dfe3abf3dd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP FOREIGN KEY \`FK_f00ae04025554d0ba41be2b1359\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f00ae04025554d0ba41be2b135\` ON \`price_schema\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_96d83fdc6beaf5e79dfe3abf3d\` ON \`price_schema\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP COLUMN \`range_km\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD \`range_km\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP COLUMN \`base_price\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD \`base_price\` int NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP COLUMN \`base_price\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD \`base_price\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP COLUMN \`range_km\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD \`range_km\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_96d83fdc6beaf5e79dfe3abf3d\` ON \`price_schema\` (\`car_class_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_f00ae04025554d0ba41be2b135\` ON \`price_schema\` (\`airport_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD CONSTRAINT \`FK_f00ae04025554d0ba41be2b1359\` FOREIGN KEY (\`airport_id\`) REFERENCES \`airports\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD CONSTRAINT \`FK_96d83fdc6beaf5e79dfe3abf3dd\` FOREIGN KEY (\`car_class_id\`) REFERENCES \`car_class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
