const baseUrl = "http://localhost:3000";

export const apiUrls = {
  addProducts: `${baseUrl}/product`,
  fetchProducts: `${baseUrl}/product`,
  updateProduct: (id) => `${baseUrl}/product/${id}`,
  deleteProduct: (id) => `${baseUrl}/product/${id}`,
  fetchSpecificProduct: (id) => `${baseUrl}/product/${id}`,
  addUser:`${baseUrl}/signup`,
  fetchUser:`${baseUrl}/users`,
  fetchUserDetails:`${baseUrl}/user`
};
