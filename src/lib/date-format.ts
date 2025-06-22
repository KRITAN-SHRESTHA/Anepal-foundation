import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
// import countryTimezone from 'country-timezone';

const countryToTimezone = {
  NP: 'Asia/Kathmandu', // Nepal
  IN: 'Asia/Kolkata', // India
  US: 'America/New_York', // USA (Eastern)
  GB: 'Europe/London', // UK
  AU: 'Australia/Sydney', // Australia
  ES: 'Europe/Madrid' // Spain
};

interface CountryToTimezoneMap {
  [countryCode: string]: string;
}

export function formatDateByCountry(
  isoDate: string | number | Date,
  countryCode: keyof CountryToTimezoneMap = 'ES'
): string {
  const timeZone =
    (countryToTimezone as CountryToTimezoneMap)[countryCode] || 'UTC'; // fallback to UTC
  const date = new Date(isoDate);
  const zonedDate = toZonedTime(date, timeZone);

  const formatted = format(zonedDate, 'd MMMM, h a');
  // return formatted.replace('AM', 'A.M.').replace('PM', 'P.M.');
  return formatted;
}

// 15 Feb 2024
// Jan 30, 2020

export function formatMDY(date: string | number | Date) {
  return format(new Date(date), 'MMM d, h a');
}
