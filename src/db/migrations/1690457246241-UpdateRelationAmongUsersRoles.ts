import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationAmongUsersRoles1690457246241
  implements MigrationInterface
{
  name = 'UpdateRelationAmongUsersRoles1690457246241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_b23c65e50a758245a33ee35fda\` ON \`user_roles\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_b23c65e50a758245a33ee35fda\` ON \`user_roles\` (\`role_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
