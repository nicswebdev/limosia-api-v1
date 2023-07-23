import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDescriptionTypeToText1689854390028
  implements MigrationInterface
{
  name = 'ChangeDescriptionTypeToText1689854390028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`car_class\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_class\` ADD \`description\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`car_class\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_class\` ADD \`description\` varchar(255) NOT NULL`,
    );
  }
}
