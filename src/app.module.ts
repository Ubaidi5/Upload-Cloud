import { Module } from '@nestjs/common';
import { FieldModule } from './field/field.module';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';

const mongo_url =
  'mongodb://ubaid-admin:dbc7a8832c7447118e25d0ee49ecd168@localhost:28185/upload-field?authSource=admin';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongo_url),
    StoreModule,
    FieldModule,
    OrderModule,
  ],
})
export class AppModule {}
