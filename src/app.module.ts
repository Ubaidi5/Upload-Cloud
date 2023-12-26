import { Module } from '@nestjs/common';
import { FieldModule } from './field/field.module';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const mongo_url =
  'mongodb://ubaid-admin:dbc7a8832c7447118e25d0ee49ecd168@localhost:28185/upload-field';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongo_url),
    StoreModule,
    FieldModule,
  ],
})
export class AppModule {}
