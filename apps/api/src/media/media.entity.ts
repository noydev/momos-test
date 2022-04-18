import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MediaType {
  VIDEO = 'video',
  IMAGE = 'image',
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MediaType,
    nullable: false,
  })
  type: string;

  @Column('varchar', {
    length: 5000,
    nullable: false,
  })
  url: string;

  @Column('varchar', { length: 5000 })
  origin: string;
}
