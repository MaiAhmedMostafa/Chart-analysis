import { Switch } from "antd";
import React from "react";
import "./SwitchButton.scss";

/**
 * a common component to display switch (toggle) button
 * @param value : isToggled or not
 * @param label : to be displayed beside the toggle button
 * @param onChange : function fire on toggle the button
 */
const SwitchButton = ({
  value,
  label,
  onChange,
}: {
  value: boolean;
  label?: string;
  onChange: () => void;
}) => {
  return (
    <div className="switch__container">
      {label ? <span className="switch__label">{label}</span> : ""}
      <Switch checked={value} onChange={onChange} />
    </div>
  );
};

export default React.memo(SwitchButton);
