import { Record as ImRecord } from 'immutable';
import type {
  TActionClear,
  TActionClearAll,
  TActionsR,
  TInit,
  TRActionsR,
} from '../types';

/**
 * Генерирует редьюсер
 * @param {T} init - Начальные значения редьюсера.
 * @param {string} domain - Переменная ограничивающая область видимости редьюсера.
 * @returns {(state: ImRecord<T> | undefined, action: TActionsR<T>) => ImRecord<T>} Функция редьюсера.
 */
function genReducer<T extends TInit<T>>(
  init: T,
  domain: string,
): (state: ImRecord<T> | undefined, action: TRActionsR<T>) => ImRecord<T> {
  const State: ImRecord.Factory<T> = ImRecord(init);

  const reducer = function (
    state: ImRecord<T> = State(),
    action: TRActionsR<T>,
  ): ImRecord<T> {
    const { type, payload } = action;

    if (typeof type !== 'string') return state;
    if (!type.includes(domain)) return state;

    const generalType = type.replace(domain, '') as typeof type;

    if (generalType === 'clearAll') {
      return state.clear();
    }
    if (generalType === 'clear') {
      return state.delete(payload);
    }

    return state.set(generalType, payload);
  };
  return reducer;
}
type TDomenKey<K, D extends string> = K extends string ? `${D}${K}` : K;

interface ActionsN<T extends TInit<T>, D extends string> {
  /** очистить все  */
  clearAll: () => TActionClearAll;
  /** очистить по ключу  */
  clear: <K extends keyof T>(key: K) => TActionClear<K>;
  /** установить значение  */
  set: <K extends keyof T>(
    key: K,
    value: T[K],
  ) => { type: TDomenKey<K, D>; payload: T[K] };
}

/**
 * Генерирует екшен креэйторы
 * @param {T} init - Начальные значения редьюсера.
 * @param {string} domain - Переменная ограничивающая область видимости редьюсера.
 * @returns ActionsN<T, typeof domain> Одбект с екшен креэйторами.
 */
function genActions<T extends TInit<T>>(
  initR: T,
  domain: string,
): ActionsN<T, typeof domain> {
  return {
    clear: (k) => ({
      type: `${domain}clear`,
      payload: k,
    }),
    clearAll: () => ({
      type: `${domain}clearAll`,
    }),
    set: (k, v) => ({
      type: `${domain}${k}` as TDomenKey<typeof k, typeof domain>,
      payload: v,
    }),
  };
}

/**
 * Генерирует екшен креэйторы и редьюсер
 * @param {T} init - Начальные значения редьюсера.
 * @param {string} domain - Переменная ограничивающая область видимости редьюсера.
 * @returns {reducer,actions} Обьект с редьюсерам и экшен креэйторами
 */
export default function initReducer<T extends TInit<T>>(
  init: T,
  name: string,
): {
  reducer: (
    state: ImRecord<T> | undefined,
    action: TRActionsR<T>,
  ) => ImRecord<T>;
  actions: ActionsN<T, typeof name>;
} {
  const domain = `${name}/`;
  return {
    reducer: genReducer(init, domain),
    actions: genActions(init, domain),
  };
}
