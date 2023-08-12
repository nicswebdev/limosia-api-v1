import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnsOnGuestToNullable1690457404282
  implements MigrationInterface
{
  name = 'ChangeColumnsOnGuestToNullable1690457404282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`city\` \`city\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`state\` \`state\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`zip_code\` \`zip_code\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`phone\` \`phone\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`zip_code\` \`zip_code\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`state\` \`state\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`city\` \`city\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`guests\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`,
    );
  }
}
