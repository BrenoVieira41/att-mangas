import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Manga } from './Mangas';

@Entity()
export class Preferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  link: string;

  @Column()
  watched: string;

  @Column()
  manga_id: number;

  @OneToOne(() => Manga)
  @JoinColumn()
  manga: Manga;
}
