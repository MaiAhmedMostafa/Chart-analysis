import { useTranslation } from "react-i18next";
import { loadResource } from "i18n/i18n";
import { useEffect, useState } from "react";
import { IObjectOFStrings } from "types/generalTypes";

/**
 * @typedef {Object} Localization
 * @property {Function} t: function that take key as input and return value in set language
 * @property {string} language: currently used language
 * @property {string} dir: currently used language direction (rtl, ltr)
 * @property {boolean} isLtr: return if the set language are left-to-right
 */
/**
 * @summary useLocalization hook is a custom hook used to setup the translation configurations
 * @param {object} props
 * @param {Object} [props.enStrings]: object contains key-value pairs for english language
 * @param {Object} [props.arStrings]: object contains key-value pairs for arabic language
 * @returns {Localization}
 */
export const useLocalization = ({
  enStrings,
  arStrings,
}: {
  enStrings: IObjectOFStrings;
  arStrings: IObjectOFStrings;
}) => {
  const { t, i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadResource({ enStrings, arStrings });
      setIsLoaded(true);
    }
  });

  return {
    t,
    isLoaded,
    language: i18n.language,
    dir: i18n.dir(),
    isLtr: i18n.dir() === "ltr" ? true : false,
  };
};
