import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import kin from "./locales/kin/translation.json";
import fr from "./locales/fr/translation.json";
import sw from "./locales/sw/translation.json";
import es from "./locales/es/translation.json";
import zh from "./locales/zh/translation.json";
import hi from "./locales/hi/translation.json";
import ar from "./locales/ar/translation.json";
import pt from "./locales/pt/translation.json";
import de from "./locales/de/translation.json";
import bn from "./locales/bn/translation.json";
import ru from "./locales/ru/translation.json";
import id from "./locales/id/translation.json";
import ur from "./locales/ur/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";
import it from "./locales/it/translation.json";
import tr from "./locales/tr/translation.json";
import vi from "./locales/vi/translation.json";
import mr from "./locales/mr/translation.json";

const savedLanguage = localStorage.getItem("kgt-language") || "en";
const supportedLanguages = ["en", "kin", "fr", "sw", "es", "zh", "hi", "ar", "pt", "de", "bn", "ru", "id", "ur", "ja", "ko", "it", "tr", "vi", "mr"];

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    kin: { translation: kin },
    fr: { translation: fr },
    sw: { translation: sw },
    es: { translation: es },
    zh: { translation: zh },
    hi: { translation: hi },
    ar: { translation: ar },
    pt: { translation: pt },
    de: { translation: de },
    bn: { translation: bn },
    ru: { translation: ru },
    id: { translation: id },
    ur: { translation: ur },
    ja: { translation: ja },
    ko: { translation: ko },
    it: { translation: it },
    tr: { translation: tr },
    vi: { translation: vi },
    mr: { translation: mr },
  },
  lng: supportedLanguages.includes(savedLanguage) ? savedLanguage : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
