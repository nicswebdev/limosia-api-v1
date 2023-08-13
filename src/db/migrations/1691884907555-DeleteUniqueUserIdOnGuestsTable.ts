import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteUniqueUserIdOnGuestsTable1691884907555
  implements MigrationInterface
{
  name = 'DeleteUniqueUserIdOnGuestsTable1691884907555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_3200408b8709b1d26efa9a0979\` ON \`guests\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_3200408b8709b1d26efa9a0979\` ON \`guests\` (\`user_id\`)`,
    );
  }
}
