/**
 * Generates a random index within the specified range.
 *
 * @param arrayLength - The length of the array or range from which to generate the random index.
 * @returns A random integer index within the given range.
 */
export function generateRandomIndex(arrayLength: number) {
  return Math.floor(Math.random() * arrayLength);
}

/**
 * Formats a name by capitalizing the first letter and converting the rest to lowercase.
 *
 * @param name - The name to be formatted.
 * @returns The formatted name.
 */
export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
