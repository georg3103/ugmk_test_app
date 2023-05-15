type Func<T, R> = (arg: T) => R;

export function compose<T>(...funcs: Func<any, any>[]): Func<T, T> {
  return function (arg: T): T {
    return funcs.reduceRight((acc, func) => func(acc as any), arg);
  };
}