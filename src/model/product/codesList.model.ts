import { ApiProperty } from "@nestjs/swagger";
import { Code } from "./code.model";

export class Codes {
    @ApiProperty({type: [Code]})
    codes: Code[];

    constructor(
        codes: Code[]
    ) {
        this.codes = codes;
    }
}