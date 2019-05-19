const fetchProducts = async (page, sortBy = '') => {
  const sortOption = sortBy ? `_sort=${sortBy}&` : '';
  const data = await fetch(
    `http://localhost:3000/api/products?${sortOption}_page=${page}&_limit=20`, {
      method: 'get',
    },
  );
  const response = await data.json();
  return response;
};

export default fetchProducts;
