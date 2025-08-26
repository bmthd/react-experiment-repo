import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import * as v from "valibot";
import { failure, type ResultAsync } from "./result";

export const withValidate = <T extends v.TupleItems>(...schemas: T) => {
  return <R>(
    handler: (...args: v.InferOutput<v.TupleSchema<T, any>>) => ResultAsync<R, string>,
  ) => {
    return async (...args: v.InferOutput<v.TupleSchema<T, any>>): ResultAsync<R, string> => {
      const validationResult = v.safeParse(v.tuple(schemas), args);
      if (!validationResult.success) {
        return failure("Invalid arguments");
      }
      return handler(...args);
    };
  };
};

export const withAuth =
  <T extends () => void>(handler: T) =>
  async (): Promise<void> => {
    const cookie = await cookies();
    const authToken = cookie.get("auth-token")?.value;
    if (!authToken) {
      return unauthorized();
    }
    return handler();
  };

export function pipe<T1, T2>(value: T1, fn: (value: T1) => T2): T2;
export function pipe<T1, T2, T3>(value: T1, fn1: (value: T1) => T2, fn2: (value: T2) => T3): T3;
export function pipe<T1, T2, T3, T4>(
  value: T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4,
): T4;
export function pipe<T1, T2, T3, T4, T5>(
  value: T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4,
  fn4: (value: T4) => T5,
): T5;
export function pipe<T1, T2, T3, T4, T5, T6>(
  value: T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4,
  fn4: (value: T4) => T5,
  fn5: (value: T5) => T6,
): T6;
export function pipe(value: unknown, ...fns: Function[]): unknown {
  return fns.reduce((acc, fn) => fn(acc), value);
}

export function pipeAsync<T1, T2>(value: T1, fn: (value: T1) => Promise<T2>): Promise<T2>;
export function pipeAsync<T1, T2, T3>(
  value: T1,
  fn1: (value: T1) => Promise<T2>,
  fn2: (value: T2) => Promise<T3>,
): Promise<T3>;
export function pipeAsync<T1, T2, T3, T4>(
  value: T1,
  fn1: (value: T1) => Promise<T2>,
  fn2: (value: T2) => Promise<T3>,
  fn3: (value: T3) => Promise<T4>,
): Promise<T4>;
export function pipeAsync<T1, T2, T3, T4, T5>(
  value: T1,
  fn1: (value: T1) => Promise<T2>,
  fn2: (value: T2) => Promise<T3>,
  fn3: (value: T3) => Promise<T4>,
  fn4: (value: T4) => Promise<T5>,
): Promise<T5>;
export function pipeAsync<T1, T2, T3, T4, T5, T6>(
  value: T1,
  fn1: (value: T1) => Promise<T2>,
  fn2: (value: T2) => Promise<T3>,
  fn3: (value: T3) => Promise<T4>,
  fn4: (value: T4) => Promise<T5>,
  fn5: (value: T5) => Promise<T6>,
): Promise<T6>;
export async function pipeAsync(
  value: unknown,
  ...fns: ((...args: unknown[]) => Promise<unknown>)[]
): Promise<unknown> {
  let result = value;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result;
}
