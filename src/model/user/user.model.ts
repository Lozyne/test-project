import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty({type: 'number'})
    id: number;

    @ApiProperty({type: 'string'})
    login: string;

    @ApiProperty({type: 'string'})
    password: string;

    @ApiProperty({type: 'string'})
    mail: string;

    constructor(
        id: number,
        login: string,
        password: string,
        mail: string
    ) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.mail = mail;
    }
}