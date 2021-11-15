import { HttpService } from "@nestjs/axios";
import { Get, Response, Controller, Body, HttpException, HttpStatus, Res, Param } from "@nestjs/common";
import { catchError, from, map, Observable } from "rxjs";
import { Code } from "src/model/product/code.model";
import { Codes } from "src/model/product/codesList.model";
import { Product } from "src/model/product/product.model";
import { ProductService } from "src/service/product.service";


@Controller('product')
export class ProductController {
  endpoint: string = 'https://world.openfoodfacts.org/api/v2/'

    constructor( private httpService: HttpService, 
      private productService: ProductService
      ) {}
  
    @Get('ean/:listEan')
    findProductByEan(@Param('listEan') listEan: string) {
      let strCode = 'code=';
      let codes: string[] = listEan.split(',');
      for(let i = 0; i<codes.length; i++) {

          strCode +=  codes[i];
          if (i < codes.length-1) {
            strCode += ',';
          }
      }

      let result = this.productService.findProductByEan(this.endpoint, strCode)

     return result;

    }
}