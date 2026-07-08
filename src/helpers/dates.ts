export const getStringDate = (date: Date) => {
  let month: string | number = date.getUTCMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  const day =
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();

  return `${date.getUTCFullYear()}-${month}-${day}`;
};

export const getConversionLogDate = (date: string | Date) => {
  const actualDate = typeof date === "string" ? new Date(date) : date;
  const day = actualDate.getUTCDate();
  const monthNumber = actualDate.getUTCMonth();
  const shortMonth = getShortMonth(monthNumber);

  return `${shortMonth} ${day}`;
};

export const getTodaysStringDate = () => getStringDate(new Date());

export const getPreviousDate = (numberOfDaysInThePast: number) => {
  const date = new Date();
  date.setDate(date.getDate() - numberOfDaysInThePast);

  return getStringDate(date);
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getShortMonth = (month: number) => months[month].substring(0, 3);

export const getYesterday = () => getPreviousDate(1);

export const getChartDate = () => {
  const todayDate = new Date();

  const month = getShortMonth(todayDate.getUTCMonth());
  const day = todayDate.getUTCDate();

  return `${month} ${day}`;
};
