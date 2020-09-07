// Core

import { SagaIterator } from '@redux-saga/core';
import {
 put, call, all, SagaReturnType, 
} from 'redux-saga/effects';

import * as api from '../api';

// Common types

import { TParameters } from '../api/aPIFetchData';

export type ErrorHttpAction = {
  error: boolean;
  message: string;
};

export type ErrorActionCreator = (
  e: boolean,
  m: string
) => {
  type: string;
  payload: ErrorHttpAction;
};

export type FetchAction = (
  payload: boolean
) => {
  type: string;
  payload: boolean;
};
export type FillActionType<T> = (
  payload: T
) => {
  type: string;
  payload: T;
};

type TaPIFilter = (p: TParameters) => Promise<unknown>;

// это нужно как-то описать я уже забыл что тут происходит
// передается объект со всеми апишками
// если значение обьекта наследуется от TaPIFetchData создаем от него тип
// fetcher тип самой апишки
// parameters получаю параметры из апишки
// isFetching тип FetchAction любой экшен
// fill экшен редьюсера
// фильрация должна быть по определенным параметрам
// 1 это функция
// 2 вернет промис
// 3 если есть парметр он должен соотвествовать параметру

type TransformAPi<T extends { [K: string]: (p: never) => void }> = {
  [K in keyof T]: T[K] extends 1 & T[K]
    ? never
    : T[K] extends (p: never) => void
    ? ReturnType<T[K]> extends Promise<unknown>
      ? Parameters<T[K]>[0] extends TParameters | undefined
        ? {
            fetcher: T[K];
            isFetching: FetchAction;
            fill: FillActionType<SagaReturnType<T[K]>>;
            setErrorAction: ErrorActionCreator;
          } & (Parameters<T[K]>[0] extends undefined
            ? { parameters?: never }
            : { parameters: Parameters<T[K]>[0] })
        : never
      : never
    : never;
};

type TUnionApi<T> = T extends {
  [K in keyof T]: infer P;
}
  ? P
  : never;

// сдесь api обьект со всеми апишками и тоже нужно подумать на сколько хорошее решение
type OptionDefolt = {
  fetcher: TaPIFilter | (() => Promise<unknown>);
  parameters?: TParameters;
  isFetching: FetchAction;
  fill: FillActionType<unknown>;
  setErrorAction: ErrorActionCreator;
};

type NotNil<T> = null | undefined extends T
  ? never
  : T extends null | undefined
  ? never
  : T;

export type OptionsType =
  | OptionDefolt
  | NotNil<TUnionApi<TransformAPi<typeof api>>>;

export type TmakeRequestWithSpinner = (options: OptionsType) => SagaIterator;

export function* makeRequestWithSpinner(options: OptionsType): SagaIterator {
  const {
 fetcher, isFetching, fill, setErrorAction, parameters, 
} = options;
  try {
    yield all([put(isFetching(true)), put(setErrorAction(false, ''))]);
    const result = parameters === undefined
        ? yield call(fetcher)
        : yield call(fetcher, parameters);

    yield put(fill(result));
  } catch (error) {
    console.error({ error });
    yield put(setErrorAction(true, error.message));
  } finally {
    yield put(isFetching(false));
  }
}
