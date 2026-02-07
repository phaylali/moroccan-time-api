import { gregorianCalendar } from "./gregorianCalendar";

interface GregorianMonth {
  order: number;
  latin: string;
  tifinagh: string;
  arabic: string;
}

function getGregorianMonth(monthIndex: number): GregorianMonth | null {
  const index = monthIndex - 1;
  if (index >= 0 && index < 12) {
    return gregorianCalendar[index];
  }
  return null;
}

function getGregorianDate(year: number, month: number, day: number) {
  if (month < 1 || month > 12) {
    throw new Error("Invalid month. Month must be between 1 and 12.");
  }

  if (day < 1 || day > 31) {
    throw new Error("Invalid day. Day must be between 1 and 31.");
  }

  const gregorianMonth = getGregorianMonth(month);
  if (!gregorianMonth) {
    throw new Error("Invalid Gregorian month");
  }

  return {
    year,
    month: gregorianMonth,
    day
  };
}

export default getGregorianDate;
