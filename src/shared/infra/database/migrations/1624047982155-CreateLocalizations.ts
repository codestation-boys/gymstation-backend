import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMatchUserProfiles1624047955732 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'localizations',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'latitude', type: 'numeric' },
          { name: 'longitude', type: 'numeric' },
          { name: 'user_id', type: 'uuid' },
          { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' }
        ],
        foreignKeys: [
          {
            name: 'localizations_user_fk',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropTable('localizations')
  }
}
