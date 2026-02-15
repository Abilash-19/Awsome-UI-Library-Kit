// src/theme/utils/deepMerge.ts

/**
 * Deep merge two objects
 * @param target - Base object
 * @param source - Object to merge into target
 * @returns Merged object
 */
export const deepMerge = <T extends object>(target: T, source: any): T => {
  const output = { ...target } as any;

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      output[key] = deepMerge(
        target[key as keyof T] as Record<string, unknown>,
        source[key] as Record<string, unknown>,
      );
    } else if (source[key] !== undefined) {
      output[key] = source[key];
    }
  }

  return output as T;
};
