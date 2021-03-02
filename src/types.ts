export type AnyRecord = {
  [KR: string]: unknown;
};

export type TInit<T extends Record<string, unknown>> = Record<
  keyof T,
  T[keyof T]
>;

export type TransformedType<T extends Record<string, unknown>> = {
  [K1 in keyof T]: K1 extends string
    ? {
        type: `${string}${K1}`;
        payload: T[K1];
      }
    : never;
};

export type TActionsR<T extends AnyRecord> = TransformedType<T> extends {
  [K in keyof TransformedType<T>]: infer P;
}
  ? P
  : never;

export type TActionClear<T> = {
  type: `${string}clear`;
  payload: T;
};
export type TActionClearAll = { type: `${string}clearAll` };

export type TRActionsR<T extends TInit<T>> =
  | TActionsR<T>
  | TActionClear<keyof T>
  | TActionClearAll;
