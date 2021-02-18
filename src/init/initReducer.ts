import { Record as ImRecord } from 'immutable';
import { R, TActions, TActionsR, TInit, TValue } from '../types';

function genReducer<T extends TInit<T>>(
  init: T,
  domain: string
): (state: ImRecord<T> | undefined, action: TActionsR<T>) => ImRecord<T> {
  const State: ImRecord.Factory<T> = ImRecord(init);

  // type TClear = {
  //   type: 'clear';
  //   payload: keyof TInit<T>;
  // };
  // type TClearALL = {
  //   type: 'clearAll';
  //   payload?:never
  // };
  //
  // type TMerge = {
  //   type: 'merge';
  //   payload: Partial<TInit<T>>;
  // };

  type TActions = TActionsR<T>;

  const reducer = function (
    state: ImRecord<T> = State(),
    action: TActions
  ): ImRecord<T> {
    const { type, payload } = action;

    console.log({ action });
    if (typeof type !== 'string') return state;
    if (!type.includes(domain)) return state;

    const generalType = type.replace(domain, '') as typeof type;

    // if (action.type === 'clearAll') {
    //   return state.clear();
    // }
    // if (action.type === 'clear') {
    //   return state.delete(action.payload);
    // }
    //
    // if (action.type === 'merge') {
    //   return state.merge(action.payload);
    // }

    return state.set(generalType, payload);
    // if (state.has(action.type)) {
    //   return state.set(action.type, action.payload);
    // }
    return state;
  };
  return reducer;
}
type TDomenKey<K, D extends string> = K extends string ? `${D}${K}` : K;

interface ActionsN<T extends TInit<T>, D extends string> {
  set: <K extends keyof T>(
    key: K,
    value: T[K]
  ) => { type: TDomenKey<K, D>; payload: T[K] };
}

function genActions<T extends TInit<T>>(
  initR: T,
  domain: string
): ActionsN<T, typeof domain> {
  return {
    set: (k, v) => ({
      type: `${domain}${k}` as TDomenKey<typeof k, typeof domain>,
      payload: v,
    }),
  };
}

export default function initReducer<T extends TInit<T>>(
  init: T,
  name: string
): {
  reducer: (
    state: ImRecord<T> | undefined,
    action: TActionsR<T>
  ) => ImRecord<T>;
  actions: ActionsN<T, typeof name>;
} {
  const domain = `${name}/`;
  return {
    reducer: genReducer(init, domain),
    actions: genActions(init, domain),
  };
}
