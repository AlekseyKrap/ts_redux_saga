import { root } from './config';

export type TParameters = {
  value: string;
  field?: string;
};
/**
 * Проверяет является ли тип расширяемым от типа TParameters
 */
export type IsTParameters<T> = T extends TParameters ? T : void;

function genFetchData<R, P extends TParameters>(
  url: string
): (p: P) => Promise<R>;
function genFetchData<R>(url: string): () => Promise<R>;
function genFetchData<R, P extends TParameters>(
  url: string,
): (p?: P) => Promise<R> {
  return async function (p?: P): Promise<R> {
    try {
      let parameters = '';
      if (typeof p !== 'undefined' && p.field !== undefined) {
        parameters = `/?${p.field}=${p.value}`;
      }
      if (typeof p !== 'undefined' && typeof p.field === 'undefined') {
        parameters = `/${p.value}`;
      }

      const response = await fetch(`${root}${url}${parameters}`, {
        method: 'GET',
      });
      return await response.json();
    } catch (e) {
      console.error({ e });
      throw e;
    }
  };
}
export default genFetchData;
