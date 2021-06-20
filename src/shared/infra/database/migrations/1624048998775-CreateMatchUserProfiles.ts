import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLocalizations1624047982155 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'match_user_profiles',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'physical_activity', type: 'text' },
          { name: 'objective', type: 'text' },
          { name: 'user_id', type: 'uuid' },
          { name: 'updated_at', type: 'timestamp', default: 'NOW()' },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' }
        ],
        foreignKeys: [
          {
            name: 'match_user_profiles_user_fk',
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
    await queryRunner.dropTable('match_user_profiles')
  }
}
