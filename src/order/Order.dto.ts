import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  instanceId: string;

  @IsString()
  orderId: string;

  @IsString()
  data: string;

  @IsString()
  sessionId: string;
}
