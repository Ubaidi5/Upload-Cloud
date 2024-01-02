/**
 * This function determines if the two objects are equal
 * It is only used for objects that have string or number as key value pair.
 */

type ObjectWithStringOrNumber = Record<string, string | number>;

export function isEqual(obj1: ObjectWithStringOrNumber, obj2: ObjectWithStringOrNumber): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all keys and corresponding values are equal
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
