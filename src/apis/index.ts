import { baseURL } from "./config";

const APIS = {
  load_store: (params: any) => {
    return baseURL.get("/store/load", { params });
  },
  embed_script: (body: any, headers: any) => {
    return baseURL.post("/store/embed_script", body, { headers });
  },
  get_fields: (params: any) => {
    return baseURL.get("/field", { params });
  },
  get_field_by_id: (fieldId: string) => {
    return baseURL.get(`/field/${fieldId}`);
  },
  create_field: (body: any) => {
    return baseURL.post("/field", body);
  },
  update_field: (body: any) => {
    return baseURL.patch("/field", body);
  },
  delete_field: (params: any) => {
    return baseURL.delete("/field", { params });
  },
  get_products: (body: { limit: number; offset: number; type: string }, headers: any) => {
    return baseURL.post("/store/products", body, { headers });
  },
};

export default APIS;
