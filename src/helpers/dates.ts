export const getStringDate = (date: Date) => {
  let month: string | number = date.getUTCMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  const day =
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();

  return `${date.getUTCFullYear()}-${month}-${day}`;
};

export const getPreviousDate = (numberOfDaysInThePast: number) => {
  const date = new Date();
  date.setDate(date.getDate() - numberOfDaysInThePast);

  return getStringDate(date);
};

export const getYesterday = () => getPreviousDate(1);
