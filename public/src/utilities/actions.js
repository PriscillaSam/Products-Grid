const fetchProducts = async (page) => {
  const data = await fetch(
    `http://localhost:3000/api/products?_page=${page}&_limit=20`, {
      method: 'get',
    },
  );
  const response = await data.json();
  return response;
};

export default fetchProducts;
