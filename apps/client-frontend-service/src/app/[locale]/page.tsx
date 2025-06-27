
import { setLocale, t } from '@paritet/shared-i18n';


interface PageProps {
  params: {
    locale: 'en' | 'ru';
  };
}
export default async function Index({ params }: PageProps) {
  const localeFromParams = params?.locale;

  const currentLocale = localeFromParams || 'en';

  console.log('Params object:', params); 
  console.log('currentLocale:', currentLocale);

  if (currentLocale === 'en' || currentLocale === 'ru') {
    setLocale(currentLocale);
  } else {
    console.warn(`Determined locale "${currentLocale}" is not supported. Using default 'en'.`);
    setLocale('en'); 
  }


  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <div>
              <h1>{t('pageTitle')}</h1> 
              <p>{t('greeting', { name: 'Server User' })}</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}