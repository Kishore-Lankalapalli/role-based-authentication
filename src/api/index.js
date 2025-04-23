const baseUrl = "https://th305mmg-3000.inc1.devtunnels.ms";

export const apiUrls = {
  addProducts: `${baseUrl}/product`,
  fetchProducts: `${baseUrl}/product`,
  updateProduct: (id) => `${baseUrl}/product/${id}`,
  deleteProduct: (id) => `${baseUrl}/product/${id}`,
  fetchSpecificProduct:(id) => `${baseUrl}/product/${id}`
};
