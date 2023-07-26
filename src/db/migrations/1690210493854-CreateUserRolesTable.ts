import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesTable1690210493854 implements MigrationInterface {
  name = 'CreateUserRolesTable1690210493854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`role_id\` int NULL, UNIQUE INDEX \`REL_87b8888186ca9769c960e92687\` (\`user_id\`), UNIQUE INDEX \`REL_b23c65e50a758245a33ee35fda\` (\`role_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_87b8888186ca9769c960e926870\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_87b8888186ca9769c960e926870\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_b23c65e50a758245a33ee35fda\` ON \`user_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_87b8888186ca9769c960e92687\` ON \`user_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`user_roles\``);
  }
}
