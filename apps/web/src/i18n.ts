
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'uk'];

export default getRequestConfig(async ({ locale }) => {
    console.log("LOCALEEEEEEEEEEEEE", locale)
    if (!locale || !locales.includes(locale)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});