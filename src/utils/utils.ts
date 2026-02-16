// src/utils/color.ts

/**
 * Add opacity/alpha to a hex color
 * @param color - Hex color (e.g., "#2563eb")
 * @param opacity - Opacity value (0-1)
 * @returns Hex color with alpha (e.g., "#2563eb80")
 */
export function withOpacity(color: string, opacity: number): string {
  // Remove # if present
  const hex = color.replace("#", "");

  // Clamp opacity between 0 and 1
  const alpha = Math.max(0, Math.min(1, opacity));

  // Convert to 0-255 and then to hex
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${hex}${alphaHex}`;
}

/**
 * Convert hex to rgba string
 * @param color - Hex color
 * @param opacity - Opacity (0-1)
 * @returns rgba string (e.g., "rgba(37, 99, 235, 0.5)")
 */
export function hexToRgba(color: string, opacity: number): string {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
