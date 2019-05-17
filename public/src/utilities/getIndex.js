const isDivisibleBy2 = (index) => {
  const value = index / 2;
  return (Math.floor(value) === Math.ceil(value));
};

export default isDivisibleBy2;
