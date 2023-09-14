import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Preferences } from './Preferences';

@Entity()
export class Manga {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chapter: string;

  @OneToOne(() => Preferences, (preferences) => preferences.manga_id)
  @JoinColumn()
  Preferences: Preferences;
}
