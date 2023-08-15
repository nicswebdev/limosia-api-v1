import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnsToOrdersTable1691904392020 implements MigrationInterface {
    name = 'AddNewColumnsToOrdersTable1691904392020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`car_class\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`price_schema\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`total_suitcase\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`car_class_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`airport_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`price_schema_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`price_schema_name\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`airport_name\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`car_class_name\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`total_suitcase\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`price_schema\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`car_class\` varchar(255) NOT NULL`);
    }

}
