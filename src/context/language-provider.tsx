import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCookie, setCookie } from '@/lib/cookies'

export type Language = 'en' | 'zh'

const DEFAULT_LANGUAGE: Language = 'en'
const LANGUAGE_COOKIE_NAME = 'locale'
const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

type LanguageContextType = {
  defaultLanguage: Language
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [language, _setLanguage] = useState<Language>(
    () => (getCookie(LANGUAGE_COOKIE_NAME) as Language) || DEFAULT_LANGUAGE
  )

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  const setLanguage = (language: Language) => {
    _setLanguage(language)
    setCookie(LANGUAGE_COOKIE_NAME, language, LANGUAGE_COOKIE_MAX_AGE)
    i18n.changeLanguage(language)
  }

  return (
    <LanguageContext
      value={{
        defaultLanguage: DEFAULT_LANGUAGE,
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
