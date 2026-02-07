import { islamicCalendar } from "./islamicCalendar";

interface IslamicMonth {
  order: number;
  latin: string;
  tifinagh: string;
  arabic: string;
}

function getIslamicMonth(monthIndex: number): IslamicMonth | null {
  const index = monthIndex - 1;
  if (index >= 0 && index < 12) {
    return islamicCalendar[index];
  }
  return null;
}

async function getIslamicDate(year: number, month: number, day: number) {
  const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  const apiUrl = `https://api.aladhan.com/v1/gToH/${formattedDate}`;

  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Islamic date');
  }

  const data = await response.json();
  const hijriDate = data.data.hijri.date;
  const [islamicDayStr, islamicMonthStr, islamicYearStr] = hijriDate.split('-');

  const islamicDay = parseInt(islamicDayStr, 10);
  const islamicMonthNum = parseInt(islamicMonthStr, 10);
  const islamicYear = parseInt(islamicYearStr, 10);

  const islamicMonth = getIslamicMonth(islamicMonthNum);
  if (!islamicMonth) {
    throw new Error("Invalid Islamic month");
  }

  return {
    year: islamicYear,
    month: islamicMonth,
    day: islamicDay
  };
}

export default getIslamicDate;
