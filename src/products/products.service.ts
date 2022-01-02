import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAllProduts(pagination) {
    let skip = 0;
    if (pagination.page != 1) {
      skip = pagination.perPage;
    }
    const count = Math.ceil(
      (await this.productRepository.count()) / pagination.perPage,
    );
    const products = await this.productRepository.find({
      take: pagination.perPage,
      skip: skip,
    });
    console.log(products);
    return { products, meta: { count } };
  }

  async getProductById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      cache: 60 * 1000,
    });
    if (!product) {
      throw new BadRequestException('product not found');
    }
    return product;
  }

  async createProduct(product: CreateProductDto) {
    const createdProduct = await this.productRepository.save(product);
    if (createdProduct) {
      return createdProduct;
    }
  }

  async updateProductById(productDto: ProductDto) {
    const product = await this.productRepository.findOne({ id: productDto.id });
    if (!product) {
      throw new BadRequestException('product not found');
    }
    return await this.productRepository.save({ ...product, ...productDto });
  }
}
