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

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
       this.id = id;
    }

    public getLogin(): string {
        return this.login;
    }

    public setLogin(login: string): void {
       this.login = login;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
       this.password = password;
    }

    public getMail(): string {
        return this.mail;
    }

    public setMail(mail: string): void {
       this.mail = mail;
    }
}