/**
 * Formats a name by capitalizing the first letter and converting the rest to lowercase.
 *
 * @param name - The name to be formatted.
 * @returns The formatted name.
 */
export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
