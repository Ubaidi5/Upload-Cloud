import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export class StoreService {
  constructor(private db: DBService) {}

  async install(code: string) {
    try {
      const OAuthRequest = {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: process.env.APP_ID,
          client_secret: process.env.APP_SECRET,
          code: code,
        }),
      };

      const data = await (await fetch('https://www.wixapis.com/oauth/access', OAuthRequest)).json();

      const appInstanceRequest = {
        method: 'GET',
        headers: { Authorization: data.access_token },
      };

      const app = await (
        await fetch('https://www.wixapis.com/apps/v1/instance', appInstanceRequest)
      ).json();

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

      return data.access_token;
    } catch (err) {
      throw err;
    }
  }

  async get_store_by_instanceId(instanceId: string) {
    return await this.db.stores.findOne({ instanceId: instanceId });
  }

  async get_access_token(refreshToken: string) {
    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: process.env.APP_ID,
          client_secret: process.env.APP_SECRET,
          refresh_token: refreshToken,
        }),
      };

      const response = await fetch('https://www.wixapis.com/oauth/access', requestOptions);
      const data = await response.json();

      return data.access_token;
    } catch (err) {
      throw err;
    }
  }

  async get_app_instance(access_token: string) {
    const requestOptions = {
      method: 'GET',
      headers: { Authorization: access_token },
    };
    const response = await fetch('https://www.wixapis.com/apps/v1/instance', requestOptions);
    const app = response.json();
    return app;
  }

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
      throw err;
    }
  }
}
