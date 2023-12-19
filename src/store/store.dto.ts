import { IsEnum, IsNumber } from 'class-validator';

enum Category {
  products = 'products',
  collections = 'collections',
}

export class GetProductDto {
  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;

  @IsEnum(Category)
  type: Category;
}
