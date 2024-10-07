export const omitKeys = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[],
): Partial<T> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};
