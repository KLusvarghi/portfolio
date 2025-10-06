import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  // Get locale from cookies or default to 'pt'
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'pt';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});