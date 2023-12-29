import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './stores.schema';
import { Field } from './fields.schema';
import { Order } from './order.schema';

@Injectable()
export class DBService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<Store>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  fields = this.fieldModel;
  stores = this.storeModel;
  order = this.orderModel;
}
