import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateMeasures1623781003990 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'measures',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'height', type: 'decimal', comment: 'm' },
          { name: 'weight', type: 'decimal', comment: 'kg' },
          { name: 'waist', type: 'decimal', comment: 'cm' },
          { name: 'neck', type: 'decimal', comment: 'cm' },
          { name: 'hip', type: 'decimal', comment: 'cm', isNullable: true },
          { name: 'user_id', type: 'uuid' },
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
