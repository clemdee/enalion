export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

export const getImageUrl = (name: string) => {
  return new URL(`./dir/${name}.png`, import.meta.url).href;
};
