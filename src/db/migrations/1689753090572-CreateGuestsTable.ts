import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGuestsTable1689753090572 implements MigrationInterface {
  name = 'CreateGuestsTable1689753090572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`guests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`f_name\` varchar(255) NOT NULL, \`l_name\` varchar(255) NOT NULL, \`dob\` date NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zip_code\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_row\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_85d472bf0e9dd55ce9a8268c3e\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_85d472bf0e9dd55ce9a8268c3e\` ON \`guests\``,
    );
    await queryRunner.query(`DROP TABLE \`guests\``);
  }
}
