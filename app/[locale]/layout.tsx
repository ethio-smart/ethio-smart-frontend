
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import {notFound} from 'next/navigation';
import { routing } from '@/i18n/routing';


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
 

  const messages = await getMessages();
  //  console.log('messages from locale layout😭😭',messages)

  // console.log('✅ Layout locale:', locale);
  // console.log('✅ Loaded messages keys:', Object.keys(messages));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
     
      {children}
    </NextIntlClientProvider>
  );
}




 
