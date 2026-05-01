import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // This will typically be the same as the locale from the params
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
