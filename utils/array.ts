
/**
 * Splits an array into chunks of a specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be split into chunks.
 * @param {number} n - The size of each chunk.
 * @returns {Generator<T[]>} A generator that yields chunks of the array.
 *
 * @example
 * ```typescript
 * const array = [1, 2, 3, 4, 5, 6, 7];
 * const chunkSize = 3;
 * const chunksGenerator = chunks(array, chunkSize);
 * 
 * for (const chunk of chunksGenerator) {
 *   console.log(chunk);
 * }
 * // Output:
 * // [1, 2, 3]
 * // [4, 5, 6]
 * // [7]
 * ```
 */
/* eslint-disable consistent-return */
export function* chunks<T>(array: T[], n: number): Generator<T[]> {
  if (!array) {
    return array;
  }

  if (n <= 0) {
    return array;
  }

  for (let i = 0; i < array.length; i += n) {
    yield array.slice(i, i + n);
  }
}
