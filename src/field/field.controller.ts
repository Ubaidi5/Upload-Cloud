import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { FieldDto } from './field.dto';
import { FieldService } from './field.service';

@Controller('field')
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @Post('')
  create_field(@Body() body: FieldDto) {
    return this.fieldService.create_field(body);
  }

  @Patch('')
  update_field(@Body() body: FieldDto) {
    return this.fieldService.update_field(body);
  }

  @Delete('')
  delete_field(@Body() fieldId: string) {
    return this.fieldService.delete_field(fieldId);
  }
}
