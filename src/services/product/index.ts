import instance from "@/lib/axios/instance";

export const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  addProduct: (data: any, token: string) =>
    instance.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteProduct: () => instance.delete("/api/product"),
};

export default productServices;
