import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user')
@Unique(['mail'])
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
    @IsEmail()
    mail: string;

    
}