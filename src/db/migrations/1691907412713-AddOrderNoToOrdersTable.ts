import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderNoToOrdersTable1691907412713
  implements MigrationInterface
{
  name = 'AddOrderNoToOrdersTable1691907412713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`order_no\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD UNIQUE INDEX \`IDX_035026a83bef9740d7ad05df38\` (\`order_no\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP INDEX \`IDX_035026a83bef9740d7ad05df38\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`order_no\``);
  }
}
