import { Record as ImRecord } from 'immutable';
import { TActions, TActionsR, TInit } from '../types';

function genReducer<T extends TInit<T>>(
  init: T,
  domain: string,
): (state: ImRecord<T> | undefined, action: TActionsR<T>) => ImRecord<T> {
  const State: ImRecord.Factory<T> = ImRecord(init);

  const reduser = function (
    state: ImRecord<T> = State(),
    action: TActionsR<T>,
  ): ImRecord<T> {
    if (!action.type.includes(domain)) return state;
    const type = action.type.replace(domain, '');
    if (state.has(type)) {
      return state.set(type, action.payload);
    }
    return state;
  };
  return reduser;
}

function genActions<T extends TInit<T>>(initR: T, domain: string): TActions<T> {
  function isValidKey(key: unknown): key is keyof TActions<T> {
    if (typeof key !== 'string') {
      return false;
    }
    return Object.hasOwnProperty.call(initR, key);
  }

  const actions = {} as TActions<T>;

  Object.entries(initR).forEach(([k, v]) => {
    if (isValidKey(k)) {
      actions[k] = (p: typeof v) => ({
        type: `${domain}${k}`,
        payload: p,
      });
    }
  });

  return actions;
}

export default function initReduser<T extends TInit<T>>(
  init: T,
  name: string,
): {
  reduser: (
    state: ImRecord<T> | undefined,
    action: TActionsR<T>
  ) => ImRecord<T>;
  actions: TActions<T>;
} {
  const domain = `${name}/`;
  return {
    reduser: genReducer(init, domain),
    actions: genActions(init, domain),
  };
}
