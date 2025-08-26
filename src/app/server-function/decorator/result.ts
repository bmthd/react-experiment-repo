export type Success<T> = {
  success: true;
  data: T;
};

export type Failure<E> = {
  success: false;
  error: E;
};

export type Result<T, E> = Success<T> | Failure<E>;

export type ResultAsync<T, E> = Promise<Result<T, E>>;

export function success<T>(data: T): Success<T> {
  return { success: true, data };
}

export function failure<E>(error: E): Failure<E> {
  return { success: false, error };
}
