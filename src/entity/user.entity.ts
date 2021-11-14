import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id: number;

    @Column({ length: 500 })
    login: string;

    @Column({ length: 500 })
    password: string;

    @Column({ length: 500 })
    mail: string;

    
}