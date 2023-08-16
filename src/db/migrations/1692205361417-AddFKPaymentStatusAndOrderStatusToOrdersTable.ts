import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKPaymentStatusAndOrderStatusToOrdersTable1692205361417
  implements MigrationInterface
{
  name = 'AddFKPaymentStatusAndOrderStatusToOrdersTable1692205361417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`payment_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`order_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`payment_status_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`order_status_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_6953fcc11506ee6c4f04b396687\` FOREIGN KEY (\`payment_status_id\`) REFERENCES \`payment_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_f51b75ebdfdef60d264f982a60f\` FOREIGN KEY (\`order_status_id\`) REFERENCES \`order_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_f51b75ebdfdef60d264f982a60f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_6953fcc11506ee6c4f04b396687\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`order_status_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`payment_status_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`order_status\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`payment_status\` varchar(255) NOT NULL`,
    );
  }
}
