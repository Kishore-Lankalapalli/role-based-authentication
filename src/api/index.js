const baseUrl = "https://role-based-authentication-backend-6ujp.onrender.com";

// baseUrl ='http://localhost:4000'

export const apiUrls = {
  login: `${baseUrl}/login`,
  addProducts: `${baseUrl}/product`,
  fetchProducts: `${baseUrl}/product`,
  updateProduct: (id) => `${baseUrl}/product/${id}`,
  deleteProduct: (id) => `${baseUrl}/product/${id}`,
  fetchSpecificProduct: (id) => `${baseUrl}/product/${id}`,
  addUser: `${baseUrl}/signup`,
  fetchUser: `${baseUrl}/users`,
  fetchUserDetails: `${baseUrl}/user`,
};
