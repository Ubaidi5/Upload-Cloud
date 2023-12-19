import { Module } from '@nestjs/common';
import { FieldModule } from './field/field.module';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const mongo_url = 'mongodb://localhost:27017/upload-field';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(mongo_url),
    StoreModule,
    FieldModule,
  ],
})
export class AppModule {}
