import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
  constructor() {}
}
