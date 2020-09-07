import { root } from './config';

export type TParameters = {
  value: string;
  field?: string;
};

function aPIFetchData<R, P extends TParameters>(
  url: string
): (p: P) => Promise<R>;
function aPIFetchData<R>(url: string): () => Promise<R>;
function aPIFetchData<R, P extends TParameters>(url: string): unknown {
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
export default aPIFetchData;
