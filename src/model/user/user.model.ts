export class UserDTO {
    id: number;
    login: string;
    password: string;
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