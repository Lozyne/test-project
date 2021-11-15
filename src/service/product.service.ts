import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { Product } from 'src/model/product/product.model';

@Injectable()
export class ProductService {

  constructor( private httpService: HttpService) {}

    findProductByEan(apiUrl: string, codes: string): Observable<Product[]> {
      let resp: Observable<Product[]>;
      let products: Product[];

      try {
        let request = this.httpService.get(apiUrl +'search?'+ codes + '&fields=code,product_name');
        resp=  request.pipe(
          map(
            currentProd =>{
              
              products = currentProd.data['products'];
              return products;
              }
          ),
        )
        
        return resp;
      } catch(error) {
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
        
      }
  
      }

}
