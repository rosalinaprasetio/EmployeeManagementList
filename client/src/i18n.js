import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next'
import languageEN from './locale/en/translate.json'
import languageID from './locale/id/translate.json'

const options = 
{
    order: ['navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
  
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
  
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
  
    checkWhitelist: false,
    checkForSimilarInWhitelist: false,
  }
  
i18next
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    resources: {
        en: languageEN,
        id: languageID
    },
    detection: options,
    fallbackLng: "en",
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default'
    }
  });

export default i18next;