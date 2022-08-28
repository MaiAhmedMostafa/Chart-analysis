import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "./i18n.config.json";

import generalEnStrings from "./general.common.en.json";
import generalArStrings from "./general.common.ar.json";
import { IObjectOFStrings } from "types/generalTypes";

export const loadResource = ({
  enStrings,
  arStrings,
}: {
  enStrings: IObjectOFStrings;
  arStrings: IObjectOFStrings;
}) => {
  if (config.english && enStrings) {
    config.english.forEach((lang: string) => {
      i18n.addResourceBundle(lang, "common", enStrings);
    });
  }

  if (config.arabic && arStrings) {
    config.arabic.forEach((lang: string) => {
      i18n.addResourceBundle(lang, "common", arStrings);
    });
  }

  //here we can handle another languages
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(LanguageDetector)
  // init i18next
  .init({
    detection: {
      order: ["querystring", "navigator"],
      lookupQuerystring: "locale",
    },
    resources: {},
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false,
    },
  });

//we can add another languages
loadResource({
  enStrings: generalEnStrings,
  arStrings: generalArStrings,
});

export default i18n;
