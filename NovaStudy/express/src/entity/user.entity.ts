import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm'

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    salt: string;
}