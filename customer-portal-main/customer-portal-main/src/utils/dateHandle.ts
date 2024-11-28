
export function getDateFormatYYYYMMDD(date: Date | null): string {
  if(date != null) {
    return date.toLocaleDateString('en-CA') ?? Date.now().toLocaleString('en-CA');
  }
  return Date.now().toLocaleString('en-CA');
}
export function getDateTomorrowFormatYYYYMMDD(): string {
  return getDateFormatYYYYMMDD(new Date((Date.now() + 86400000)));
}
export function getDateAfterTomorrowFormatYYYYMMDD(): string {
  return getDateFormatYYYYMMDD(new Date((Date.now() + 86400000*2)));
}
export function getCurrentMilliseconds(): number {
  return Date.now();
}
export function getBefore2MonthMilliseconds(): number {
  return Date.now() + 1000*60*60*24*60;
}
export function getBefore1HourMilliseconds(): number {
  return Date.now() + 1000*60*60;
}
export function getDateTomorrow(): Date {
  return new Date(Date.now() + 86400000);
}

export function getDateAfterTomorrow(): Date {
  return new Date(Date.now() + 86400000*2);
}

export function getDateFormatDDMM(date: Date | null): string {
  if(date != null) {
    return date.toLocaleDateString('vi-vn') ?? Date.now().toLocaleString('vi-vn');
  }
  return Date.now().toLocaleString('vi-vn');
}

export function getDateDiff(checkin: string, checkout: string): number {
  if(checkin <= checkout) {
    const ci = new Date(checkin);
    const co = new Date(checkout);
    return (co.getDate() - ci.getDate()); 
  }
  return 1;
}