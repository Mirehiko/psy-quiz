import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1728289238743 implements MigrationInterface {
  name = 'InitialMigration1728289238743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "run_answer_entity" ("id" SERIAL NOT NULL, "questionId" character varying(150) NOT NULL, "answer" character varying(500) NOT NULL, "userId" text NOT NULL, "runId" integer, CONSTRAINT "PK_4e2981fc403d9a43494d24a61e8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "question_answer_entity" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "description" character varying(500) NOT NULL, "createdById" text NOT NULL, "questionId" integer, CONSTRAINT "PK_2f213a195cc88605a4e1ee253b7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "question_type_entity" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "description" character varying(500), CONSTRAINT "PK_12a317bc9999d909d53774659aa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "question_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(150), "description" character varying(500), "free_answer" text, "createdById" text NOT NULL, "answerTypeId" integer, "testId" integer, CONSTRAINT "PK_14a0a509f33d8cd3a96a448dcd7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "criterion_entity" ("id" SERIAL NOT NULL, "minScore" integer NOT NULL, "maxScore" integer NOT NULL, "name" text NOT NULL, "description" text, "createdById" text NOT NULL, "scaleId" integer, CONSTRAINT "PK_aeafbfbdcdb8d59a057a8334c9b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "scale_answer_entity" ("id" SERIAL NOT NULL, "questionId" character varying(150) NOT NULL, "answer" text NOT NULL, "createdById" text NOT NULL, "scaleId" integer, CONSTRAINT "PK_5c92695fc2a00985eb37ea470be" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "scale_entity" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "description" character varying(500) NOT NULL, "createdById" text NOT NULL, "testId" integer, CONSTRAINT "PK_f0a13531f7232b68e38b2db430c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "test_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(150) NOT NULL, "description" character varying(500) DEFAULT '', "picture" text, "createdById" text NOT NULL, CONSTRAINT "PK_cc0413536e3afc0e586996bea40" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "test_run_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userId" text NOT NULL, "createdById" text NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "endDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "testId" integer, CONSTRAINT "PK_7da84d6eacf84a8b9f2cbe89f7e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "connected_user_entity" ("id" SERIAL NOT NULL, "socketId" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_a903379d19b275c008fa625f0fa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permission_entity" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "displayName" character varying(150) NOT NULL, "description" character varying(500) NOT NULL, CONSTRAINT "PK_57a5504c7abcb1d2a9c82ae6f48" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_entity" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "displayName" character varying(150) NOT NULL, "description" character varying(500) NOT NULL, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE TYPE "public"."user_entity_status_enum" AS ENUM('pending', 'active')`);
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "avatar" text, "suspendedAt" TIMESTAMP, "status" "public"."user_entity_status_enum" NOT NULL DEFAULT 'pending', "suspendReason" text, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expireAt" TIMESTAMP NOT NULL, "userIdId" integer, CONSTRAINT "UQ_9b8c6eac80e52d95241b573877f" UNIQUE ("token"), CONSTRAINT "REL_a400db51f01ce7d38ef24c09ba" UNIQUE ("userIdId"), CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "profile_entity" ("id" SERIAL NOT NULL, "gender" character varying(500) NOT NULL, "age" text, CONSTRAINT "PK_330d3560db0dac16f06a04609bb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_entity_permissions_permission_entity" ("roleEntityId" integer NOT NULL, "permissionEntityId" integer NOT NULL, CONSTRAINT "PK_cbdf5cb47edf1711ba34864d255" PRIMARY KEY ("roleEntityId", "permissionEntityId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c58c915f7dfc3b9d6746d4a318" ON "role_entity_permissions_permission_entity" ("roleEntityId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c18b1176211a6a9ce8c5818931" ON "role_entity_permissions_permission_entity" ("permissionEntityId") `
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity_roles_role_entity" ("userEntityId" integer NOT NULL, "roleEntityId" integer NOT NULL, CONSTRAINT "PK_9426d726a48f9c5d9c83c6eb91f" PRIMARY KEY ("userEntityId", "roleEntityId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3277e83a0656736e30b901d9a3" ON "user_entity_roles_role_entity" ("userEntityId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_63f06698e4071b610eca2da812" ON "user_entity_roles_role_entity" ("roleEntityId") `
    );
    await queryRunner.query(
      `ALTER TABLE "run_answer_entity" ADD CONSTRAINT "FK_fd80db538ea8ac4bd1d4f00b7de" FOREIGN KEY ("runId") REFERENCES "test_run_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "question_answer_entity" ADD CONSTRAINT "FK_cd30ea1c3bdbfb0ab5cbc1e236f" FOREIGN KEY ("questionId") REFERENCES "question_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "question_entity" ADD CONSTRAINT "FK_0b891cb2719bf0496e52c41062a" FOREIGN KEY ("answerTypeId") REFERENCES "question_type_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "question_entity" ADD CONSTRAINT "FK_7005feb36a900e918086cee045d" FOREIGN KEY ("testId") REFERENCES "test_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "criterion_entity" ADD CONSTRAINT "FK_e157edc67d5599bb231589ee33a" FOREIGN KEY ("scaleId") REFERENCES "scale_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "scale_answer_entity" ADD CONSTRAINT "FK_1115a2d042718c68ea5ea5726fb" FOREIGN KEY ("scaleId") REFERENCES "scale_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "scale_entity" ADD CONSTRAINT "FK_31cc64eb49d782729f35a6f46b4" FOREIGN KEY ("testId") REFERENCES "test_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "test_run_entity" ADD CONSTRAINT "FK_8c78faac4edf8df1732a77a65d7" FOREIGN KEY ("testId") REFERENCES "test_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "connected_user_entity" ADD CONSTRAINT "FK_a2cac4ca8aafbecb41901b07edb" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_token" ADD CONSTRAINT "FK_a400db51f01ce7d38ef24c09baf" FOREIGN KEY ("userIdId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_entity_permissions_permission_entity" ADD CONSTRAINT "FK_c58c915f7dfc3b9d6746d4a3188" FOREIGN KEY ("roleEntityId") REFERENCES "role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "role_entity_permissions_permission_entity" ADD CONSTRAINT "FK_c18b1176211a6a9ce8c5818931c" FOREIGN KEY ("permissionEntityId") REFERENCES "permission_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity_roles_role_entity" ADD CONSTRAINT "FK_3277e83a0656736e30b901d9a30" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity_roles_role_entity" ADD CONSTRAINT "FK_63f06698e4071b610eca2da812c" FOREIGN KEY ("roleEntityId") REFERENCES "role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity_roles_role_entity" DROP CONSTRAINT "FK_63f06698e4071b610eca2da812c"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity_roles_role_entity" DROP CONSTRAINT "FK_3277e83a0656736e30b901d9a30"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_entity_permissions_permission_entity" DROP CONSTRAINT "FK_c18b1176211a6a9ce8c5818931c"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_entity_permissions_permission_entity" DROP CONSTRAINT "FK_c58c915f7dfc3b9d6746d4a3188"`
    );
    await queryRunner.query(`ALTER TABLE "user_token" DROP CONSTRAINT "FK_a400db51f01ce7d38ef24c09baf"`);
    await queryRunner.query(`ALTER TABLE "connected_user_entity" DROP CONSTRAINT "FK_a2cac4ca8aafbecb41901b07edb"`);
    await queryRunner.query(`ALTER TABLE "test_run_entity" DROP CONSTRAINT "FK_8c78faac4edf8df1732a77a65d7"`);
    await queryRunner.query(`ALTER TABLE "scale_entity" DROP CONSTRAINT "FK_31cc64eb49d782729f35a6f46b4"`);
    await queryRunner.query(`ALTER TABLE "scale_answer_entity" DROP CONSTRAINT "FK_1115a2d042718c68ea5ea5726fb"`);
    await queryRunner.query(`ALTER TABLE "criterion_entity" DROP CONSTRAINT "FK_e157edc67d5599bb231589ee33a"`);
    await queryRunner.query(`ALTER TABLE "question_entity" DROP CONSTRAINT "FK_7005feb36a900e918086cee045d"`);
    await queryRunner.query(`ALTER TABLE "question_entity" DROP CONSTRAINT "FK_0b891cb2719bf0496e52c41062a"`);
    await queryRunner.query(`ALTER TABLE "question_answer_entity" DROP CONSTRAINT "FK_cd30ea1c3bdbfb0ab5cbc1e236f"`);
    await queryRunner.query(`ALTER TABLE "run_answer_entity" DROP CONSTRAINT "FK_fd80db538ea8ac4bd1d4f00b7de"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_63f06698e4071b610eca2da812"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3277e83a0656736e30b901d9a3"`);
    await queryRunner.query(`DROP TABLE "user_entity_roles_role_entity"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c18b1176211a6a9ce8c5818931"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c58c915f7dfc3b9d6746d4a318"`);
    await queryRunner.query(`DROP TABLE "role_entity_permissions_permission_entity"`);
    await queryRunner.query(`DROP TABLE "profile_entity"`);
    await queryRunner.query(`DROP TABLE "user_token"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TYPE "public"."user_entity_status_enum"`);
    await queryRunner.query(`DROP TABLE "role_entity"`);
    await queryRunner.query(`DROP TABLE "permission_entity"`);
    await queryRunner.query(`DROP TABLE "connected_user_entity"`);
    await queryRunner.query(`DROP TABLE "test_run_entity"`);
    await queryRunner.query(`DROP TABLE "test_entity"`);
    await queryRunner.query(`DROP TABLE "scale_entity"`);
    await queryRunner.query(`DROP TABLE "scale_answer_entity"`);
    await queryRunner.query(`DROP TABLE "criterion_entity"`);
    await queryRunner.query(`DROP TABLE "question_entity"`);
    await queryRunner.query(`DROP TABLE "question_type_entity"`);
    await queryRunner.query(`DROP TABLE "question_answer_entity"`);
    await queryRunner.query(`DROP TABLE "run_answer_entity"`);
  }
}
