export type R = {
  [KR: string]: unknown;
};

export type TInit<T extends Record<string, unknown>> = Record<
  keyof T,
  T[keyof T]
>;

export type TValue<T> = T[keyof T];

export type TActions<T extends Record<string, TValue<T>>> = Record<
  string,
  (p: TValue<T>) => { type: string; payload: TValue<T> }
>;

export type TransformedType<T extends Record<string, unknown>> = {
  [K1 in keyof T]: {
    type: K1;
    payload: T[K1];
  };
};

export type TActionsR<T extends R> = TransformedType<T> extends {
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
