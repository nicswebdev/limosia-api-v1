import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersTable1689779332073 implements MigrationInterface {
  name = 'CreateOrdersTable1689779332073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`f_name\` varchar(255) NOT NULL, \`l_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`dob\` date NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zip_code\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`pickup_point\` varchar(255) NOT NULL, \`destination_point\` varchar(255) NOT NULL, \`range\` varchar(255) NOT NULL, \`pickup_date\` date NOT NULL, \`pickup_time\` time NOT NULL, \`flight_number\` varchar(255) NOT NULL, \`total_guest\` int NOT NULL, \`car_class\` varchar(255) NOT NULL, \`price_schema\` varchar(255) NOT NULL, \`order_currency\` varchar(255) NOT NULL, \`payment_status\` varchar(255) NOT NULL, \`order_status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_row\` tinyint NOT NULL DEFAULT 0, \`guest_id\` int NULL, UNIQUE INDEX \`IDX_290bc8842ff16ea3be0f1a74c3\` (\`email\`), UNIQUE INDEX \`REL_4a7d03c27412dbfb47ac912b3e\` (\`guest_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_4a7d03c27412dbfb47ac912b3e3\` FOREIGN KEY (\`guest_id\`) REFERENCES \`guests\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_4a7d03c27412dbfb47ac912b3e3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_4a7d03c27412dbfb47ac912b3e\` ON \`orders\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_290bc8842ff16ea3be0f1a74c3\` ON \`orders\``,
    );
    await queryRunner.query(`DROP TABLE \`orders\``);
  }
}
