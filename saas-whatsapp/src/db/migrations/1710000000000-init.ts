import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1710000000000 implements MigrationInterface {
  name = 'Init1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE messages (
        id VARCHAR(36) PRIMARY KEY,
        channel VARCHAR(16) NOT NULL,
        \`to\` VARCHAR(32) NOT NULL,
        body TEXT NOT NULL,
        status VARCHAR(16) NOT NULL DEFAULT 'PENDING',
        idempotencyKey VARCHAR(128) NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_to (\`to\`),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE messages;`);
  }
}
