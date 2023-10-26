import { ParsedBabyData } from "@/api/types";

/**
 * Formats a name by capitalizing the first letter and converting the rest to lowercase.
 *
 * @param name - The name to be formatted.
 * @returns The formatted name.
 */
export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 * Returns a random object from the given array.
 *
 * @param array - The array from which to select a random object.
 * @returns A randomly selected object from the array.
 */
export function getRandomObjectFromArray(array: ParsedBabyData[]): ParsedBabyData {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
