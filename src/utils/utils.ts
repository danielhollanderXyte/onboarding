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

export function getNextSortValue(value?: "asc" | "desc" | null) {
  switch (value) {
    case "asc":
      return null;
    case "desc":
      return "asc";
    case null:
      return "desc";
    default:
      return "asc";
  }
}
