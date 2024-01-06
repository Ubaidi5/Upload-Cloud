import { Body, Controller, Get, Post, Patch, Delete, Param, Headers, Query } from '@nestjs/common';
import { FieldDto } from './field.dto';
import { FieldService } from './field.service';

@Controller('field')
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @Get('/:id?')
  get_field(@Param('id') fieldId: string, @Headers('X-InstanceId') instanceId: string) {
    if (fieldId) {
      return this.fieldService.get_field_by_id(fieldId);
    } else {
      return this.fieldService.get_store_fields(instanceId);
    }
  }

  @Post('/current')
  get_current_field(@Body() body: { productId: string; instanceId: string }) {
    return this.fieldService.get_current_field(body);
  }

  @Post('')
  create_field(@Body() body: FieldDto) {
    return this.fieldService.create_field(body);
  }

  @Patch('')
  update_field(@Body() body: Partial<FieldDto>) {
    return this.fieldService.update_field(body);
  }

  @Delete('')
  delete_field(@Query('fieldId') fieldId: string) {
    return this.fieldService.delete_field(fieldId);
  }

  @Post('duplicate')
  duplicate_field(@Body() body: { fieldId: string }) {
    return this.fieldService.duplicate(body.fieldId);
  }
}
