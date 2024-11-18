export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

// Object.groupBy not yet supported by current node LTS 20.17 (needs 21.0)
export const groupBy = <T, S extends string>(array: T[], fn: ((value: T) => S)) => {
  const record: Partial<Record<S, T[]>> = {};
  array.forEach((value) => {
    const key = fn(value);
    record[key] ??= [];
    record[key].push(value);
  });
  return record;
};

export const concatString = (array: unknown[], separator = ' '): string => {
  return array
    .filter((item) => {
      if (Number.isNaN(item)) return false;
      if (item === undefined) return false;
      if (item === null) return false;
      return true;
    })
    .map((item) => {
      if (Array.isArray(item)) return concatString(item);
      return `${item}`;
    })
    .join(separator);
};

export const dashify = (string: string) => string
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .replace(/\W+/gu, '-')
  .toLowerCase();
