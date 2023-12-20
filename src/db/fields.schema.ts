import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Field {
  @Prop()
  fieldName: string;

  @Prop()
  isRequired: boolean;

  @Prop()
  targeting: string;

  @Prop()
  labelText: string;

  @Prop()
  buttonText: string;

  @Prop()
  helpText: string;

  @Prop()
  labelSize: string;

  @Prop()
  labelColor: string;

  @Prop()
  buttonTextSize: string;

  @Prop()
  buttonTextColor: string;

  @Prop()
  helpTextSize: string;

  @Prop()
  helpTextColor: string;

  @Prop()
  paddingX: string;

  @Prop()
  paddingY: string;

  @Prop()
  buttonBackgroundColor: string;

  @Prop()
  buttonHoverColor: string;

  @Prop()
  buttonRadius: string;

  @Prop()
  buttonWidth: string;

  @Prop()
  showPreview: boolean;

  @Prop()
  numberOfFiles: string;

  @Prop()
  min: string;

  @Prop()
  max: string;

  @Prop()
  dimension: string;

  @Prop()
  imageWidth: string;

  @Prop()
  imageHeight: string;

  @Prop()
  previewStyle: string;

  @Prop({ default: 'active' })
  status: string; // "" | "deleted"

  @Prop({ default: true })
  enabled: boolean;

  @Prop()
  instanceId: string;

  @Prop({ default: '[]' })
  selectedItems: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
