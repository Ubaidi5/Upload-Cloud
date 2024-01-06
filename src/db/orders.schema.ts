import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

type order_status = 'active' | 'deleted';

@Schema({ timestamps: true })
export class Order {
  @Prop()
  instanceId: string;

  @Prop()
  data: string;

  @Prop()
  sessionId: string;

  @Prop()
  orderId: string;

  @IsOptional()
  @Prop()
  customerName: string;

  @IsOptional()
  @Prop()
  orderNumber: number;

  @IsOptional()
  @Prop()
  lineItems: string;

  @IsOptional()
  @Prop()
  buyerInfo: string;

  @Prop({ default: 'active' })
  status: order_status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
