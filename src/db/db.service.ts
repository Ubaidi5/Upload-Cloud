import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './stores.schema';
import { Field } from './fields.schema';

@Injectable()
export class DBService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  fields = this.fieldModel;
  stores = this.storeModel;
}
