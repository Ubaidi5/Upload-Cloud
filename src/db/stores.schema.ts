import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Store {
  @Prop()
  instanceId: string;

  @Prop()
  refreshToken: string;

  @Prop()
  siteUrl: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
