import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { FieldDto } from './field.dto';

@Injectable()
export class FieldService {
  constructor(private db: DBService) {}

  async get_field_by_id(fieldId: string) {
    try {
      const field = await this.db.fields.findById(fieldId);

      if (!field) {
        throw new NotFoundException('Field not found');
      }

      return field;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async get_store_fields(instanceId: string) {
    try {
      const fields = await this.db.fields.find({ instanceId: instanceId, status: 'active' });
      return fields;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async get_current_field(body: { instanceId: string; productId: string }) {
    try {
      // const fields = await this.db.fields.find({
      //   instanceId: body.instanceId,
      //   selectedItems: {
      //     $regex: body.productId,
      //     $options: 'i',
      //   },
      // });

      const fields = await this.db.fields.find({ instanceId: body.instanceId }).lean();

      const currentField = fields.find((field) => {
        if (field.targeting === 'all' && !field.selectedItems.includes(body.productId)) {
          return true;
        } else if (field.selectedItems.includes(body.productId)) {
          return true;
        } else {
          return false;
        }
      });

      if (currentField) {
        return currentField;
      } else {
        return { status: 404 };
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async create_field(args: FieldDto) {
    try {
      const field = new this.db.fields(args);
      return field.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update_field(args: Partial<FieldDto>) {
    try {
      const { _id, ...rest } = args;
      const field = await this.db.fields
        .findOneAndUpdate({ _id: _id }, { $set: { ...rest } }, { new: true })
        .lean();

      return field;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete_field(fieldId: string) {
    try {
      return this.db.fields.findOneAndUpdate({ _id: fieldId }, { $set: { status: 'inactive' } });
    } catch (err) {
      throw err;
    }
  }
}
