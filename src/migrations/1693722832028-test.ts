import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1693722832028 implements MigrationInterface {
    name = 'Test1693722832028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_entity\` (\`id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`post_entity\``);
    }

}
