import {connectApi} from './request';

export const translateText = async (
  value: string,
  source: string,
  target: string,
) => {
  const data = {
    q: value,
    source: source,
    target: target,
    format: 'text',
  };
  const res = await connectApi(
    'POST',
    'https://libretranslate.de/translate',
    data,
  );
  return res?.data?.translatedText;
};
