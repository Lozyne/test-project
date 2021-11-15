import { Code } from "typeorm";

export class Product {
    code: Code;
    product_name: string;

    constructor(
        code: Code,
        product_name: string
    ) {
       
        this.code = code;
        this.product_name = product_name;
    }
}