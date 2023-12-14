import { Global, Module } from '@nestjs/common';
import { DBService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from './fields.schema';
import { Store, StoreSchema } from './stores.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: Field.name, schema: FieldSchema },
    ]),
  ],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
