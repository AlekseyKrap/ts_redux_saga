// export type TInit<T extends Record<string, unknown>> = Record<
//   string,
//   T[keyof T & string]
// >;

export type R = {
  [KR: string]: unknown;
};

export type TInit<T extends Record<string, unknown>> = Record<
  keyof T,
  T[keyof T]
>;

// export type TActions<T extends TInit<T>> = {
//   [K in keyof T & string]: (p: T[K]) => { type: string; payload: T[K] };
// };
// export type TActions<T extends TInit<T>> = {
//   [K in keyof T ]?: (p: T[K]) => { type: string; payload: T[K] };
// };
export type TValue<T> = T[keyof T];

export type TActions<T extends Record<string, TValue<T>>> = Record<
  string,
  (p: TValue<T>) => { type: string; payload: TValue<T> }
>;

// export type TransformedType<T extends TInit<T>> = {
//   [K in keyof T]: {
//     type: K extends string ? K : never;
//     payload: K extends keyof T & string ? T[K] : never;
//   };
// };
export type TransformedType<T extends Record<string, unknown>> = {
  [K1 in keyof T]: {
    type: K1;
    payload: T[K1];
  };
};

// export type TActionsR<T extends TInit<T>> = TransformedType<T> extends {
//   [K in keyof TransformedType<T>]: infer P;
// }
//   ? P
//   : never;
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
