import { Some } from "@/helpers";

function pick<T extends Dict, K extends keyof T>(
  obj: T,
  ...keys: Array<K>
): Pick<T, K> {
  return keys.reduce((subObject, key) => {
    subObject[key] = Some.Object<T>(obj)[key];
    return subObject;
  }, {} as Pick<T, K>);
}

export default pick;
