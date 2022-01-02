import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { CreateProductDto } from './dto/createProduct.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './products.entity';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Создание продукта' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() productDto: CreateProductDto) {
    const product = await this.productService.createProduct(productDto);
    return product;
  }

  @ApiOperation({ summary: 'Получить все продукты с пагинацей' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  async getAllPorducts(@Query() params: PaginationDto) {
    const page = params?.page || 1;
    const perPage = params.perPage || 2;

    return await this.productService.getAllProduts({ page, perPage });
  }

  @ApiOperation({ summary: 'Получить продкут по id' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return await this.productService.getProductById(id);
  }

  @ApiOperation({ summary: 'Обновить продукт' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProductById(@Body() prodcutDto: ProductDto) {
    const updatedProduct = await this.productService.updateProductById(
      prodcutDto,
    );
    return updatedProduct;
  }
}
