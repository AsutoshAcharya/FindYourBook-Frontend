// https://codeberg.org/anhsirk0/some-ts

// Better version of || (it Preserves/Asserts Types runtime)
// Usage: Some.Array(user?.data) -> [name, email, ...] or []
// Usage: Some.Array(user?.numbers, [1, 2, 3]) -> [n1, n2, ...] or [1, 2, 3]
// Usage: Some.String(user?.name) -> "user name" or ""

export class Some {
  static Array<T = any>(arr?: any, defaultValue?: Array<T>): Array<T> {
    if (Array.isArray(arr)) return arr;
    return defaultValue || [];
  }

  static String(str?: any, defaultValue?: string): string {
    if (typeof str === "number") return str.toString();
    if (typeof str === "string") return str;
    return defaultValue || "";
  }

  static Number(num?: any, defaultValue?: number): number {
    if (typeof num === "string") return Number(num) ?? defaultValue ?? 0;
    if (typeof num === "number") return num;
    if (defaultValue !== undefined) return defaultValue;
    return 0;
  }

  static Boolean(b?: any, defaultValue?: boolean): boolean {
    if (typeof b === "boolean") return b;
    if (b === true.toString()) return true;
    if (b === false.toString()) return false;
    if (defaultValue !== undefined) return defaultValue;
    return Boolean(b);
  }

  // This won't preserve types, instead it asserts
  // Some.Object<Type1>(objectOfType2) => objectOfType2 as Type1;
  static Object<T extends Record<string, any>>(obj?: any, defaultValue?: T): T {
    if (typeof obj === "object" && !Array.isArray(obj) && obj !== null)
      return obj as T;
    return (defaultValue || {}) as T;
  }

  static Date(dateStr: string): Date {
    let date = new Date(dateStr);
    if (isNaN(date.valueOf())) return new Date();
    return new Date(date.toISOString().slice(0, -1));
  }
}
