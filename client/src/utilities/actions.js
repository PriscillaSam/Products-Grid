const fetchProducts = async (page, sortBy = '') => {
  const sortOption = sortBy ? `_sort=${sortBy}&` : '';
  const data = await fetch(
    `http://localhost:3000/api/products?${sortOption}_page=${page}&_limit=100`,
    {
      method: 'get',
    },
  );
  const response = await data.json();
  return response;
};

export default fetchProducts;
