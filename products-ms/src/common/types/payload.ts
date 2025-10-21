export type Payload<T> =
  | { message: string; data: T }
  | { message: string; data: T[] }
  | { message: string }
  | T
  | T[];
