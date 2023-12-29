import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  instanceId: string;

  @IsString()
  @IsOptional()
  productName: string;

  @IsString()
  @IsOptional()
  data: string;

  @IsString()
  @IsOptional()
  sessionId: string;
}
