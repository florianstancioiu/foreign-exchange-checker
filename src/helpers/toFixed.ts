const toFixed = (number: number, fixed: number) => {
  const regex = new RegExp("^-?\\d+(?:\.\\d{0," + (fixed || -1) + "})?");
  const returnValue = number.toString().match(regex);

  return returnValue ? returnValue[0] : number;
};

export default toFixed;
