import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from "src/controller/product.controller";
import { HttpModule } from "@nestjs/axios";
import { ProductService } from "src/service/product.service";

@Module({
    imports: [HttpModule],
    controllers: [ProductController],
    providers: [
      ProductService
    ],
    exports: []
  })
  export class ProductModule {}