import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExternalAuthsTable1690623534076
  implements MigrationInterface
{
  name = 'CreateExternalAuthsTable1690623534076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`external_auths\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`provider_user_id\` int NOT NULL, \`provider_name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_row\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`external_auths\` ADD CONSTRAINT \`FK_e23cb363a9f5b319b2057ccd042\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`external_auths\` DROP FOREIGN KEY \`FK_e23cb363a9f5b319b2057ccd042\``,
    );
    await queryRunner.query(`DROP TABLE \`external_auths\``);
  }
}
