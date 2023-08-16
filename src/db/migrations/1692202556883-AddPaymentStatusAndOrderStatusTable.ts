import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentStatusAndOrderStatusTable1692202556883
  implements MigrationInterface
{
  name = 'AddPaymentStatusAndOrderStatusTable1692202556883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`payment_statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_c53a7a4b4c263c378b03d3a1cf\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_59aa93a6953b828b98972f4766\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`payment_statuses\``);
    await queryRunner.query(`DROP TABLE \`order_statuses\``);
  }
}
