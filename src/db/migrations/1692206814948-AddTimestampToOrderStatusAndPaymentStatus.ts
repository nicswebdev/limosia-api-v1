import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampToOrderStatusAndPaymentStatus1692206814948
  implements MigrationInterface
{
  name = 'AddTimestampToOrderStatusAndPaymentStatus1692206814948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment_statuses\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_statuses\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_statuses\` ADD \`delete_row\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_statuses\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_statuses\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_statuses\` ADD \`delete_row\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_statuses\` DROP COLUMN \`delete_row\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_statuses\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_statuses\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_statuses\` DROP COLUMN \`delete_row\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_statuses\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment_statuses\` DROP COLUMN \`created_at\``,
    );
  }
}
