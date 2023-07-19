import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePriceSchemaTable1689754180876 implements MigrationInterface {
  name = 'CreatePriceSchemaTable1689754180876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`price_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tier_name\` varchar(255) NOT NULL, \`range_km\` varchar(255) NOT NULL, \`base_price\` varchar(255) NOT NULL, \`rate\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_row\` tinyint NOT NULL DEFAULT 0, \`airport_id\` int NULL, \`car_class_id\` int NULL, UNIQUE INDEX \`REL_f00ae04025554d0ba41be2b135\` (\`airport_id\`), UNIQUE INDEX \`REL_96d83fdc6beaf5e79dfe3abf3d\` (\`car_class_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD CONSTRAINT \`FK_f00ae04025554d0ba41be2b1359\` FOREIGN KEY (\`airport_id\`) REFERENCES \`airports\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` ADD CONSTRAINT \`FK_96d83fdc6beaf5e79dfe3abf3dd\` FOREIGN KEY (\`car_class_id\`) REFERENCES \`car_class\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP FOREIGN KEY \`FK_96d83fdc6beaf5e79dfe3abf3dd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`price_schema\` DROP FOREIGN KEY \`FK_f00ae04025554d0ba41be2b1359\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_96d83fdc6beaf5e79dfe3abf3d\` ON \`price_schema\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f00ae04025554d0ba41be2b135\` ON \`price_schema\``,
    );
    await queryRunner.query(`DROP TABLE \`price_schema\``);
  }
}
