export type TransformedType<T> = {
  [K in keyof T]: { type: K; payload: T[K] };
};
export type TActionsR<T> = TransformedType<T> extends {
  [K in keyof TransformedType<T>]: infer P;
}
  ? P
  : never;

export type TItemR<
  I extends { [K: string]: unknown },
  T extends string
> = T extends keyof I ? { type: T; payload: I[T] } : never;

export type TItemRNonNullable<
  I extends { [K: string]: unknown },
  T extends string
> = T extends keyof I ? { type: T; payload: NonNullable<I[T]> } : never;
