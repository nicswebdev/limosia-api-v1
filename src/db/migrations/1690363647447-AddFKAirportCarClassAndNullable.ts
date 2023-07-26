import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKAirportCarClassAndNullable1690363647447
  implements MigrationInterface
{
  name = 'AddFKAirportCarClassAndNullable1690363647447';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
