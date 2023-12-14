import { Module } from '@nestjs/common';
import { FieldModule } from './field/field.module';
import { StoreModule } from './store/store.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongo_url = 'mongodb://localhost:27017/upload-field';

@Module({
  imports: [MongooseModule.forRoot(mongo_url), StoreModule, FieldModule],
})
export class AppModule {}
