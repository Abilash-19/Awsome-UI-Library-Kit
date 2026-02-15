// src/theme/utils/deepMerge.ts

/**
 * Deep merge two objects
 * @param target - Base object
 * @param source - Object to merge into target
 * @returns Merged object
 */
export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T => {
  const output = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      output[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>,
      ) as T[Extract<keyof T, string>];
    } else if (source[key] !== undefined) {
      output[key] = source[key] as T[Extract<keyof T, string>];
    }
  }

  return output;
};
