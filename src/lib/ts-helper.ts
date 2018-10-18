import { pick as _pick } from "lodash-es";

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
  const newObj: Partial<T> = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}

// export function omit<T, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
//   const newObj: Partial<T> = {};
//   for (const key of Object.keys(obj)) {
//     if (!keys.includes(key as K)) {
//       newObj[key] = obj[key];
//     }
//   }
//   return newObj;
// }
