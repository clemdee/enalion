import { computed } from 'vue';

export interface ParsedDate {
  year?: string
  month?: string
  day?: string
}

const matchDate = (date: string) => {
  const dateRegex = /^(?<year>\d{4})(?:-(?<month>\d{2})(?:-(?<day>\d{2}))?)?$/u;
  const parsedDate = (date.match(dateRegex)?.groups ?? {}) as ParsedDate;
  return parsedDate;
};

export interface ParsedTime {
  hours?: string
  minutes?: string
}

const matchTime = (time?: string) => {
  const timeRegex = /^(?<hours>\d{2}):(?<minutes>\d{2})$/u;
  const parsedTime = (time?.match(timeRegex)?.groups ?? {}) as ParsedTime;
  return parsedTime;
};

const getDateWithDefault = (datetime: {
  year?: string
  month?: string
  day?: string
  hours?: string
  minutes?: string
  time?: string
}) => {
  return new Date(
    +(datetime.year ?? (new Date().getFullYear())),
    +(datetime.month ?? 1) - 1,
    +(datetime.day ?? 1),
    +(datetime.hours ?? 0),
    +(datetime.minutes ?? 0),
  );
};

interface ResolvedData {
  hasYear: boolean
  hasMonth: boolean
  hasDay: boolean
  hasHours: boolean
  hasMinutes: boolean
  pastMidnight: boolean
}

const resolveDate = ({ date, time }: {
  date: string | Date
  time?: string
}): [Date, ResolvedData] => {
  if (date instanceof Date) {
    return [
      date,
      {
        hasYear: true,
        hasMonth: true,
        hasDay: true,
        hasHours: true,
        hasMinutes: true,
        pastMidnight: date.getHours() < 6,
      },
    ];
  }
  const parsedDate = matchDate(date);
  const parsedTime = matchTime(time);
  return [
    getDateWithDefault({
      ...parsedDate,
      ...parsedTime,
    }),
    {
      hasYear: !!parsedDate.year,
      hasMonth: !!parsedDate.month,
      hasDay: !!parsedDate.day,
      hasHours: !!parsedTime.hours,
      hasMinutes: !!parsedTime.minutes,
      pastMidnight: (parsedTime.hours && +parsedTime.hours < 6) || false,
    },
  ];
};

export const useDateTimeData = ({ date, time }: {
  date: string | Date
  time?: string
}) => {
  const [resolvedDate, resolvedData] = resolveDate({ date, time });

  const lang = 'fr';

  const getFormat = (condition: boolean, option: Intl.DateTimeFormatOptions): string | undefined => {
    if (!condition) return;
    if (option.hour || option.hour12 || option.hourCycle || option.minute || option.second) {
      return resolvedDate.toLocaleTimeString(lang, option);
    }
    return resolvedDate.toLocaleDateString(lang, option);
  };

  return computed(() => ({
    date: resolvedDate,
    year: getFormat(resolvedData.hasYear, { year: 'numeric' }),
    month: getFormat(resolvedData.hasMonth, { month: '2-digit' }),
    monthLong: getFormat(resolvedData.hasMonth, { month: 'long' }),
    monthShort: getFormat(resolvedData.hasMonth, { month: 'short' }),
    day: getFormat(resolvedData.hasDay, { day: '2-digit' }),
    weekdayLong: getFormat(resolvedData.hasDay, { weekday: 'long' }),
    weekdayShort: getFormat(resolvedData.hasDay, { weekday: 'short' }),
    // remove trailing ' h' from output
    hours: getFormat(resolvedData.hasHours, { hour: '2-digit' })?.substring(0, 2),
    minutes: getFormat(resolvedData.hasMinutes, { minute: '2-digit' }),
    pastMidnight: resolvedData.pastMidnight,
  }));
};
