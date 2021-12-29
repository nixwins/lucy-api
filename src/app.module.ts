import { Module } from '@nestjs/common';
import { AuthModlue } from './auth/auth.module';
import ProductModule from './products/product.module';

@Module({ imports: [ProductModule, AuthModlue] })
export default class ApplicationModule {}
