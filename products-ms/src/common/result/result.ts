/**
 * Result Pattern - Encapsula operaciones que pueden fallar
 * Inspirado en Rust's Result<T, E> y functional programming
 */
export class Result<T, E = Error> {
  private readonly _success: boolean;
  private readonly _value?: T;
  private readonly _error?: E;

  private constructor(success: boolean, value?: T, error?: E) {
    this._success = success;
    this._value = value;
    this._error = error;

    if (success && error) {
      throw new Error('Result cannot be success and have an error');
    }
    if (!success && value !== undefined) {
      throw new Error('Result cannot be failure and have a value');
    }
  }

  static ok<T, E = Error>(value: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  static err<T, E = Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  isOk(): this is Result<T, never> {
    return this._success;
  }

  isErr(): this is Result<never, E> {
    return !this._success;
  }

  // Getters seguros
  unwrap(): T {
    if (!this._success) {
      throw new Error('Called unwrap on an Err value');
    }
    return this._value as T;
  }

  unwrapOr(defaultValue: T): T {
    return this._success ? (this._value as T) : defaultValue;
  }

  unwrapOrElse(fn: (error: E) => T): T {
    return this._success ? (this._value as T) : fn(this._error as E);
  }

  // Acceso al error
  error(): E | undefined {
    return this._error;
  }

  // Métodos funcionales (muy útiles!)
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isErr()) {
      return Result.err(this._error as E);
    }
    return Result.ok(fn(this._value as T));
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    if (this.isOk()) {
      return Result.ok(this._value as T);
    }
    return Result.err(fn(this._error as E));
  }

  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isErr()) {
      return Result.err(this._error as E);
    }
    return fn(this._value as T);
  }

  // Match pattern
  match<U>(pattern: { ok: (value: T) => U; err: (error: E) => U }): U {
    if (this.isOk()) {
      return pattern.ok(this._value as T);
    }
    return pattern.err(this._error as E);
  }
}

// Tipos auxiliares útiles
export type ResultAsync<T, E = Error> = Promise<Result<T, E>>;

// Helper para convertir try-catch a Result
export async function fromPromise<T, E = Error>(
  promise: Promise<T>,
  errorMapper?: (error: unknown) => E,
): Promise<Result<T, E>> {
  try {
    const value = await promise;
    return Result.ok(value);
  } catch (error) {
    const mappedError = errorMapper ? errorMapper(error) : (error as E);
    return Result.err(mappedError);
  }
}

// Combinar múltiples Results
export function combine<T, E = Error>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];

  for (const result of results) {
    if (result.isErr()) {
      return Result.err(result.error() as E);
    }
    values.push(result.unwrap());
  }

  return Result.ok(values);
}
