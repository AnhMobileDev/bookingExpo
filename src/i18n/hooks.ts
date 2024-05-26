import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';

type LanguageChangedHandler = (prev: string | undefined, curr: string) => void;

/**
 * Hook to listen to language change
 * Note that the handler will be triggered when changed with previous and current language identical
 *
 * @param handler Handler on language change. Handler will be called with previous language is `undefined` when the component is mounted
 */
export function useLanguageChange(handler: LanguageChangedHandler) {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const {
    i18n: { language },
  } = useI18nextTranslation();

  useEffect(() => {
    if (language == null) return;
    handler(currentLanguage, language);
    setCurrentLanguage(language);
  }, [language, handler, currentLanguage]);
}

/**
 * Hook with utilities for multi-language / i18n
 * WARNING: the hook should not be used when the `initI18n` is not called or being called in its lifetime
 * @param args The namespace(s) to be use with this translation hook
 * @returns `t` and `tJson` functions and `i18n` instance
 */
export function useTranslation(...args: Parameters<typeof useI18nextTranslation>) {
  const opts = useI18nextTranslation(...args);

  const {
    i18n: { language, services },
  } = opts;

  const tJson = useCallback(
    (json?: string): string | undefined => {
      if (json == null) return undefined;
      try {
        const obj = JSON.parse(json);
        if (obj[language]) return obj[language];
        return '';
      } catch (err) {
        return json;
      }
    },
    [language],
  );

  const supportedLanguages = useMemo(
    () => Object.keys(services?.resourceStore.data ?? {}),
    [services?.resourceStore.data],
  );

  return {
    ...opts,
    tJson,
    /**
     * Not to be confused with i18n.languages, which is order of how to resolve a language
     */
    supportedLanguages,
  };
}
