import { amazighCalendar } from "./amazighCalendar";

interface JulianDate {
  year: number;
  month: number;
  day: number;
}

function gregorianToJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function jdnToJulian(jdn: number): JulianDate {
  const c = jdn + 32082;
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

function getAmazighMonth(monthIndex: number) {
  const index = monthIndex - 1;
  if (index >= 0 && index < 12) {
    return amazighCalendar[index];
  }
  return null;
}

function getAmazighDate(year: number, month: number, day: number) {
  const jdn = gregorianToJDN(year, month, day);
  const julian = jdnToJulian(jdn);
  
  const amazighYear = julian.year + 950;
  const amazighMonth = getAmazighMonth(julian.month);
  
  if (!amazighMonth) {
    throw new Error("Invalid Julian month");
  }
  
  return {
    year: amazighYear,
    month: amazighMonth,
    day: julian.day
  };
}

export default getAmazighDate;