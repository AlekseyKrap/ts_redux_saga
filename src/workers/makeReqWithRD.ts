import { SagaIterator } from '@redux-saga/core';
import { put, call } from 'redux-saga/effects';
import { Record } from 'immutable';
import { IsTParameters } from '../api/aPIFetchData';

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
 * Описывает тип аргумента для makeReqWithRD
 * fetcher - функция запрашивающая данные
 * fill - данные которые должен получить fetcher
 * parameters - параметры для запроса данных
 */

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

/**
 * Функция генерирует объект ReceivedData
 */
export type TGenReceivedData<T> = (data: T | null) => Record<ReceivedData<T>>;
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
  return Record(initData)();
}

/**
 * Описывает тип для функции итератора makeReqWithRD
 */
export type TMakeReqWithRD<T extends (v: Parameters<T>[0]) => ReturnType<T>> = (
  options: OptionsType<T>
) => SagaIterator;

export function* makeReqWithRD<
  T extends (v: Parameters<T>[0]) => ReturnType<T>
>(options: OptionsType<T>): SagaIterator {
  const { fetcher, fill, parameters } = options;
  let receivedData = yield call<TGenReceivedData<ThenArg<ReturnType<T>>>>(
    genReceivedData,
    null
  );
  try {
    receivedData = receivedData.set('isLoading', true);
    yield put(fill(receivedData));
    const result: ThenArg<ReturnType<T>> = yield call(fetcher, parameters);
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
