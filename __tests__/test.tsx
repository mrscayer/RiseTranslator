import {translateText} from '../src/utils/translations';

describe('translation test en to tr', () => {
  it('should return Merhaba', async () => {
    expect(await translateText('hi', 'en', 'tr')).toBe('Merhaba' || 'merhaba');
  });
});
