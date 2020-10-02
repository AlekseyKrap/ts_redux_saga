import { SagaIterator } from '@redux-saga/core';
import {
 put, call, all, SagaReturnType, 
} from 'redux-saga/effects';
import { Record } from 'immutable';
import * as api from '../api';
import genFetchData, { IsTParameters, TParameters } from '../api/aPIFetchData';
import { rInitRMenu, TRInitMenu } from '../domains/Menu/reduser';

/**
 * Описывает экшен который сохраняет результат запроса
 */
export type FillActionType<T> = (
  payload: T
) => {
  type: string;
  payload: T;
};

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
/**
 * Описывает тип полученных данных
 *
 */
export type ReceivedData<T> = {
  data: T | null;
  isLoading: boolean;
  LTU: number;
  error: {
    isError: boolean;
    message: string;
  };
};

/**
 * Описывает тип преобразующий структуру вида  [K: string]: (p: never) => void
 * к структуре вида [K: string]:{
 *     fetcher
 *     fill
 *     parameters
 * }
 * -- T[K] extends 1 & T[K] проверка на any
 * -- T[K] extends (p: never) => void проверка на то что значение является методом api
 * -- Parameters<T[K]>[0] extends TParameters | undefined
 * проверка если есть параметр он должен расширятся от TParameters
 * -- не все методы api должны иметь parameters
 */
type TransformAPi<T extends { [K: string]: (p: never) => void }> = {
  [K in keyof T]: T[K] extends 1 & T[K]
    ? never
    : T[K] extends (p: never) => void
    ? ReturnType<T[K]> extends Promise<unknown>
      ? Parameters<T[K]>[0] extends TParameters | undefined
        ? {
            fetcher: T[K];
            fill: FillActionType<Record<ReceivedData<SagaReturnType<T[K]>>>>;
          } & (Parameters<T[K]>[0] extends undefined
            ? { parameters?: never }
            : { parameters: Parameters<T[K]>[0] })
        : never
      : never
    : never;
};
// попробывать переписать в интерфейс

// export type OptionsType<T extends (p: never) => void> = {
//       fetcher: T;
//       fill: FillActionType<Record<ReceivedData<SagaReturnType<T>>>>;
//     } & (Parameters<T>[0] extends undefined
//       ? { parameters?: never }
//       : { parameters: Parameters<T>[0] })

// export type OptionsType<T extends (v: never|undefined) => void> = T extends () => void
//   ? {
//       fetcher: T;
//       fill: FillActionType<Record<ReceivedData<SagaReturnType<T>>>>;
//     }
//   : T extends (v: IsTParameters<Parameters<T>[0]>) => void
//   ? {
//       fetcher: T;
//       fill: FillActionType<Record<ReceivedData<SagaReturnType<T>>>>;
//       parameters: Parameters<T>[0];
//     }
//   : never;
export type MySagaReturnType<S> = S extends (
  ...args: never[]
) => Promise<infer RT>
  ? RT
  : never;

export type OptionsType<
  T extends (v: Parameters<T>[0]) => ReturnType<T>
> = T extends () => ReturnType<T>
  ? {
      fetcher: T;
      fill: FillActionType<Record<ReceivedData<ThenArg<ReturnType<T>>>>>;

      parameters?: undefined;
    }
  : T extends (v: IsTParameters<Parameters<T>[0]>) => ReturnType<T>
  ? {
      fetcher: T;
      fill: FillActionType<Record<ReceivedData<ThenArg<ReturnType<T>>>>>;

      parameters: Parameters<T>[0];
    }
  : never;

// export function GenOpt<T extends(p: never|undefined) => void>(
//   p: OptionsType<T>): OptionsType<T> {
//   return p;
// }
// export function GenOpt<T extends(v: never) => void>(
//   v: OptionsType<T>): OptionsType<T> {
//   return v;
// }

/**
 * Преобразует структуру к объеденному типу
 */
type TUnionApi<T> = T extends {
  [K in keyof T]: infer P;
}
  ? P
  : never;

/**
 * Дефолтный тип для options на тот случай если API пуст
 */
type OptionDefolt = {
  fetcher: (p: TParameters) => Promise<unknown> | (() => Promise<unknown>);
  parameters?: TParameters;
  fill: FillActionType<unknown>;
};

/**
 * Отсекает (пустые значения )типы null | undefined
 */
type NotNil<T> = null | undefined extends T
  ? never
  : T extends null | undefined
  ? never
  : T;

/**
 * Описывает тип для options
 */
// export type OptionsType =
//   | OptionDefolt
//   | NotNil<TUnionApi<TransformAPi<typeof api>>>;
// export type OptionsType = NotNil<TUnionApi<TransformAPi<typeof api>>>;

// export type OptionsType = TransformAPi2

export function genReceivedData<T>(data: T | null): Record<ReceivedData<T>> {
  const initData: ReceivedData<T> = {
    data,
    isLoading: false,
    LTU: 0,
    error: {
      isError: false,
      message: '',
    },
  };
  const ReceivedDataF: Record.Factory<ReceivedData<T>> = Record(initData);
  return new ReceivedDataF();
}

/**
 * Описывает тип для функции итератора makeRequestWithSpinner
 */
export type TmakeRequestWithSpinner<
  T extends (v: Parameters<T>[0]) => ReturnType<T>
> = (options: OptionsType<T>) => SagaIterator;

export function* makeRequestWithSpinner<
  T extends(v: Parameters<T>[0]) => ReturnType<T>
>(options: OptionsType<T>): SagaIterator {
  const { fetcher, fill, parameters } = options;
  // !!!!!!!!! разобраться что реально забирает и филл
  type Data = SagaReturnType<T>;
  let receivedData = genReceivedData<ThenArg<ReturnType<T>>>(null);
  try {
    type TT = typeof fill;
    type P = Parameters<TT>[0]; // параметры из fill
    type Cd = ThenArg<ReturnType<T>>;
    const ddd: P = genReceivedData<Cd>(null);
    type RT = typeof receivedData;
    fill(receivedData);
    //  Record<ReceivedData<SagaReturnType<T>>>
    //  Record<ReceivedData<SagaReturnType<T>>>

    yield put(fill(receivedData));

    const result: ThenArg<ReturnType<T>> = yield call(fetcher, parameters);
    // ? yield call(fetcher,)
    // : yield call(fetcher, parameters);

    receivedData = receivedData.set('data', result);
    yield put(fill(receivedData));
  } catch (error) {
    console.error({ error });
    receivedData = receivedData.set('error', {
      isError: true,
      message: error.message,
    });

    yield put(fill(receivedData));
  } finally {
    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now());

    yield put(fill(receivedData));
  }
}
