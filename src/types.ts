export type R = {
  [KR: string]: unknown;
};

export type TInit<T extends Record<string, unknown>> = Record<
  keyof T,
  T[keyof T]
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
