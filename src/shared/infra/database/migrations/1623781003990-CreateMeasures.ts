import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMeasures1623781003990 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'measures',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'height', type: 'integer' },
          { name: 'weight', type: 'integer' },
          { name: 'waist', type: 'integer' },
          { name: 'neck', type: 'integer' },
          { name: 'hip', type: 'integer', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' }
        ],
        foreignKeys: [
          {
            name: 'measures_user_fk',
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
    await queryRunner.dropTable('measures')
  }
}
