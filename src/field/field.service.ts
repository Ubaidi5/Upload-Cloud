import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { FieldDto } from './field.dto';

@Injectable()
export class FieldService {
  constructor(private db: DBService) {}

  async create_field(args: FieldDto) {
    const field = new this.db.fields(args);
    return field.save();
  }

  async update_field(args: FieldDto) {
    const { _id, ...rest } = args;
    const field = await this.db.fields
      .findOneAndUpdate({ _id: _id }, { $set: { ...rest } }, { new: true })
      .lean();

    return field;
  }

  async delete_field(fieldId: string) {
    return this.db.fields.findOneAndUpdate(
      { _id: fieldId },
      { $set: { status: false } },
    );
  }
}
