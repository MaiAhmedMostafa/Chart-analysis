import React from "react";

import { useLocalization } from "handlers/useLocalization";
import enStrings from "i18n/general.common.en.json";
import arStrings from "i18n/general.common.ar.json";
import loadingImage from "style/images/loading-square.gif";
import "./LoadingScreen.scss";

/**
 * Component to display loading screen during fetching the data
 */
const LoadingScreen = () => {
  const { t } = useLocalization({
    enStrings,
    arStrings,
  });

  return (
    <div className="window-loading" data-testid="loading">
      <img src={loadingImage} alt={`${t("loading")}...`} />
    </div>
  );
};

export default React.memo(LoadingScreen);
