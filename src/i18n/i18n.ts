import i18n, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './en';
import { vi } from './vi';

const applicationNamespace = 'app';

export type LanguagePack = { [key: string]: string | LanguagePack };

export type Resources = {
  [key: string]: LanguagePack;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof applicationNamespace;
    resources: {
      [applicationNamespace]: typeof en;
    };
  }
}

/**
 * Initialize i18next
 * @param resources The resources / language packs
 * @param useSuspense To control whether experimental Suspense of React support should be enabled
 */
function initI18n(resources: Resources, useSuspense?: boolean): Promise<TFunction> {
  const supportedLanguages = Object.keys(resources);

  return i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    defaultNS: applicationNamespace,
    ns: [applicationNamespace],
    react: { useSuspense: useSuspense ?? false },

    resources: supportedLanguages.reduce(
      (acc, lang) => ({
        ...acc,
        [lang]: {
          [applicationNamespace]: resources[lang],
        },
      }),
      {},
    ),
    interpolation: {
      escapeValue: false,
    },

    lng: 'en',
  });
}

export async function i18nInit() {
  const defaultLanguages = {
    en,
    vi,
  };
  await initI18n(defaultLanguages);
}
