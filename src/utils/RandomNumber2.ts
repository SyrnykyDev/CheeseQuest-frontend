const randomNumberInRange = (min: number = 1, max: number = 100000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default randomNumberInRange;
