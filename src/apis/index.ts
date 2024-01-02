import { baseURL } from "./config";

function getHeaders() {
  const refreshToken = localStorage.getItem("__UC_refresh_token");

  return {
    Authorization: refreshToken,
  };
}

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
  get_products: (body: { limit: number; offset: number; type: string }) => {
    const headers = getHeaders();
    return baseURL.post("/store/products", body, { headers });
  },
  get_image: (body: { fileName: string }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    return fetch("http://localhost:3002/api/order/image", requestOptions);
  },
};

export default APIS;
