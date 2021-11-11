import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    id: number;

    @Column({ length: 500 })
    login: string;

    @Column({ length: 500 })
    password: string;

    @Column({ length: 500 })
    mail: string;
}