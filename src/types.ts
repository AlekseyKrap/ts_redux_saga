export type TInit<T extends Record<string, unknown>> = Record<
  string,
  T[keyof T & string]
>;

export type TActions<T extends TInit<T>> = {
  [K in keyof T & string]: (p: T[K]) => { type: string; payload: T[K] };
};

export type TransformedType<T extends TInit<T>> = {
  [K in keyof T]: {
    type: K extends string ? K : never;
    payload: K extends keyof T & string ? T[K] : never;
  };
};

export type TActionsR<T extends TInit<T>> = TransformedType<T> extends {
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
