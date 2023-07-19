import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1689749832116 implements MigrationInterface {
  name = 'CreateUsersTable1689749832116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`f_name\` varchar(255) NOT NULL, \`l_name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_row\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
