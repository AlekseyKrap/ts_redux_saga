export interface IRecordData<T extends Record<string, unknown>> {
  get: (key: keyof T) => T[keyof T];
  set: (key: keyof T, val: unknown) => T[keyof T];
}
