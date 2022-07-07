import {translateText} from '../src/utils/translations';

describe('translation test en to tr', () => {
  it('should return merhaba', async () => {
    const res = await translateText('hi', 'en', 'tr');
    expect(res.toLowerCase()).toBe('merhaba');
  });
});
