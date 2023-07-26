import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRateColumnTypeToInteger1690355062665
  implements MigrationInterface
{
  name = 'ChangeRateColumnTypeToInteger1690355062665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE currencies MODIFY COLUMN rate INT DEFAULT 0 NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE currencies MODIFY COLUMN rate varchar(255) DEFAULT 0 NOT NULL`,
    );
  }
}
