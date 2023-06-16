export function flattenNestedObject(obj: {}) {
  const result: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      const nestedObject = flattenNestedObject(value);
      Object.entries(nestedObject).forEach(([nestedKey, nestedValue]) => {
        result[`${key}${nestedKey}`] = nestedValue;
      });
    } else {
      result[key] = value;
    }
  });

  return result;
}
