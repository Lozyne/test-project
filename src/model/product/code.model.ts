import { ApiProperty } from "@nestjs/swagger";

export class Code {
    @ApiProperty({type: 'string'})
    code: string;

    constructor(
        code: string
    ) {
        this.code = code;
    }
}