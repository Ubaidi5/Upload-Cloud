import { IsBoolean, IsString } from 'class-validator';

export class FieldDto {
  @IsString()
  _id: string;

  @IsString()
  fieldName: string;

  @IsBoolean()
  isRequired: boolean;

  @IsString()
  targeting: string;

  @IsString()
  labelText: string;

  @IsString()
  buttonText: string;

  @IsString()
  helpText: string;

  @IsString()
  labelSize: string;

  @IsString()
  labelColor: string;

  @IsString()
  buttonTextSize: string;

  @IsString()
  buttonTextColor: string;

  @IsString()
  helpTextSize: string;

  @IsString()
  helpTextColor: string;

  @IsString()
  paddingX: string;

  @IsString()
  paddingY: string;

  @IsString()
  buttonBackgroundColor: string;

  @IsString()
  buttonHoverColor: string;

  @IsString()
  buttonRadius: string;

  @IsString()
  buttonWidth: string;

  @IsBoolean()
  showPreview: boolean;

  @IsString()
  numberOfFiles: string;

  @IsString()
  min: string;

  @IsString()
  max: string;

  @IsString()
  dimension: string;

  @IsString()
  imageWidth: string;

  @IsString()
  imageHeight: string;

  @IsString()
  previewStyle: string;

  @IsString()
  status: string; // "" | "deleted"

  @IsBoolean()
  enabled: boolean;
}
