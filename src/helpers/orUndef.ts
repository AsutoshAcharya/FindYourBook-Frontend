type Fn<V> = () => V;
function orUndef<T, V>(test: T, value: Fn<V> | V) {
  if (!test) return undefined;
  return typeof value === "function" ? (value as Fn<V>)() : value;
}

export default orUndef;
