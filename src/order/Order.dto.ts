import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  instanceId: string;

  @IsString()
  productName: string;

  @IsArray()
  images: string[];

  @IsString()
  sessionId: string;
}
