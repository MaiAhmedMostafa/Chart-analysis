import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { useHeaderLanguage, useHeaderTitle } from "handlers/headerHandler";
import { useLocalization } from "handlers/useLocalization";
import enStrings from "i18n/general.common.en.json";
import arStrings from "i18n/general.common.ar.json";
import Routes from "Routes";

import store from "redux/index";
import i18n from "i18n/i18n";

const App = () => {
  const { t } = useLocalization({
    enStrings,
    arStrings,
  });

  useHeaderLanguage({
    lang: i18n.language,
    dir: i18n.dir(i18n.language),
  });

  useHeaderTitle({
    title: t("headerTitle"),
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </I18nextProvider>
  );
};

export default App;
