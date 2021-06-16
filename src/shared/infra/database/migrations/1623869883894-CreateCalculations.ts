import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCalculations1623869883894 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'calculations',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'fat_mass', type: 'decimal', comment: 'kg' },
          { name: 'lean_mass', type: 'decimal', comment: 'kg' },
          { name: 'body_mass_index', type: 'decimal', comment: 'kg/m²' },
          { name: 'body_fat_percentage', type: 'integer', comment: '%' },
          { name: 'measures_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {

  }
}
