import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export class StoreService {
  constructor(private db: DBService) {}

  create_store() {}

  get_store_instance() {}
}
