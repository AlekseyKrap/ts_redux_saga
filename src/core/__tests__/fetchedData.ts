import { genFetchedData } from '../fetchedData';

describe('Core -> fetchedData:', () => {
  test('set Data object', () => {
    const defData = { test: 1 };
    const data = genFetchedData(defData);

    expect(data.get('data')).toEqual(defData);
  });
  test('set Data null', () => {
    const data = genFetchedData(null);

    expect(data.get('data')).toEqual(null);
  });
});
