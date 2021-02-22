import { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { FetchedData, genFetchedData } from './fetchedData';

export interface Action<T extends string> {
  type: T;
}

/** Возврощает тип из промисов */
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * Описывает тип аргумента для makeReqWithRD
 * @fetcher - функция запрашивающая данные
 * @fill - креате экшен который отправляет полученные данные в редюсер
 * @parameters - параметры для запроса данных
 */

export type OptionsType<
  T extends (params: Parameters<T>[0]) => ReturnType<T>
> = T extends () => ReturnType<T>
  ? {
      fetcher: T;
      fill: (v: FetchedData<ThenArg<ReturnType<T>>>) => Action<string>;
      parameters?: undefined;
    }
  : {
      fetcher: T;
      fill: (v: FetchedData<ThenArg<ReturnType<T>>>) => Action<string>;
      parameters: Parameters<T>[0];
    };

/**
 * Описывает тип для функции итератора makeReqWithRD
 * нужен для ефектов саги чтобы указывать параметр дженерика
 */
export type TMakeReqWithRD<T extends (v: Parameters<T>[0]) => ReturnType<T>> = (
  options: OptionsType<T>,
) => SagaIterator;

export function* makeReqWithRD<
  T extends (params: Parameters<T>[0]) => ReturnType<T>
>(options: OptionsType<T>): SagaIterator {
  const { fetcher, fill, parameters } = options;
  type TreceivedData = FetchedData<ThenArg<ReturnType<T>>>;

  let receivedData: TreceivedData = yield call<
    (data: ThenArg<ReturnType<T>> | null) => TreceivedData
  >(genFetchedData, null);

  try {
    receivedData = receivedData.set('isLoading', true);
    yield put(fill(receivedData));

    const result: ThenArg<ReturnType<T>> = yield call<
      (params: Parameters<T>[0]) => ReturnType<T>
    >(fetcher, parameters);

    receivedData = receivedData.set('data', result);
  } catch (error) {
    console.error({ error });
    receivedData = receivedData.set('error', {
      isError: true,
      message: error.message,
      code: error?.code,
    });
    yield put(fill(receivedData));
  } finally {
    receivedData = receivedData.set('isLoading', false).set('LTU', Date.now());
    yield put(fill(receivedData));
  }
}
