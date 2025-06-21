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
  countryCode: keyof CountryToTimezoneMap = 'NP'
): string {
  const timeZone =
    (countryToTimezone as CountryToTimezoneMap)[countryCode] || 'UTC'; // fallback to UTC
  const date = new Date(isoDate);
  const zonedDate = toZonedTime(date, timeZone);

  const formatted = format(zonedDate, 'd MMMM, h a');
  return formatted.replace('AM', 'a.m.').replace('PM', 'p.m.');
}
