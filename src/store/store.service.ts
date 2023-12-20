import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DBService } from 'src/db/db.service';
import axios from 'axios';
import { GetProductDto } from './store.dto';

@Injectable()
export class StoreService {
  constructor(
    private db: DBService,
    private config: ConfigService,
  ) {}

  async install(code: string) {
    try {
      const { data } = await axios.post('https://www.wixapis.com/oauth/access', {
        grant_type: 'authorization_code',
        client_id: this.config.get('APP_ID'),
        client_secret: this.config.get('APP_SECRET'),
        code: code,
      });

      console.log({ data });

      const { data: app } = await axios.get('https://www.wixapis.com/apps/v1/instance', {
        headers: { Authorization: data.access_token },
      });

      console.log({ app });

      const body = {
        siteUrl: app.site.url,
        instanceId: app.instance.instanceId,
        refreshToken: data.refresh_token,
      };

      await this.db.stores.findOneAndUpdate(
        { instanceId: body.instanceId },
        { $set: { ...body } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      return data;
    } catch (err) {
      console.log({ message: 'Error on App installation' });
      throw new BadRequestException(err?.response?.data || err);
    }
  }

  async get_store_by_instanceId(instanceId: string) {
    return await this.db.stores.findOne({ instanceId: instanceId });
  }

  async get_access_token(refreshToken: string) {
    try {
      const body = {
        grant_type: 'refresh_token',
        client_id: this.config.get('APP_ID'),
        client_secret: this.config.get('APP_SECRET'),
        refresh_token: refreshToken,
      };

      const { data } = await axios.post('https://www.wixapis.com/oauth/access', body);

      return data.access_token;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async get_app_instance(access_token: string) {
    const { data } = await axios.get('https://www.wixapis.com/apps/v1/instance', {
      headers: { Authorization: access_token },
    });

    return data;
  }

  async embed_script(instanceId: string, access_token: string) {
    try {
      const body = {
        properties: {
          parameters: {
            instanceId: instanceId,
          },
        },
      };

      const { data } = await axios.post('https://www.wixapis.com/apps/v1/scripts', body, {
        headers: { Authorization: access_token },
      });

      return data;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async get_products(body: GetProductDto, access_token: string) {
    try {
      const { data } = await axios.post(
        `https://www.wixapis.com/stores/v1/${body.type}/query`,
        {
          query: {
            paging: {
              limit: body.limit,
              offset: body.offset,
            },
            filter: body.search ? `{"name": { "$contains": "${body.search}" } }` : null,
          },
          // includeVariants: false,
          // includeHiddenProducts: false,
          // includeMerchantSpecificData: false,
        },
        {
          headers: {
            Authorization: access_token,
          },
        },
      );

      return data;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // This API is not currently is not in used.
  // Delete this comment once
  async load_store(instanceId: string) {
    try {
      // get store
      const store = await this.db.stores.findOne({ instanceId: instanceId });

      // get access_token
      const access_token = await this.get_access_token(store.refreshToken);

      // get app instance
      const app = await this.get_app_instance(access_token);

      return {
        store,
        instance: app.instance,
        site: app.site,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
