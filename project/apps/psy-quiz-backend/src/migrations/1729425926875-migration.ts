import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729425926875 implements MigrationInterface {
    name = 'Migration1729425926875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_run_entity" ADD "isFinished" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_run_entity" DROP COLUMN "isFinished"`);
    }

}
