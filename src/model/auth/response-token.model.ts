export class ResponseToken {
    access_token: string;
    public constructor(
        access_token: string
    ) {
        this.access_token = access_token;
    }

    getAccessToken(): string {
        return this.access_token;
    }

    setAccessToken(access_token): void {
        return this.access_token = access_token;
    }
}