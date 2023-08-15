import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteUniqueEmailOnOrdersTable1692112206334
  implements MigrationInterface
{
  name = 'DeleteUniqueEmailOnOrdersTable1692112206334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_290bc8842ff16ea3be0f1a74c3\` ON \`orders\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_290bc8842ff16ea3be0f1a74c3\` ON \`orders\` (\`email\`)`,
    );
  }
}
