import React from "react";
import { Select } from "antd";
import "./DropDownList.scss";

/**
 * a common component to display dropdownList
 * @param label : ddl label
 * @param data : ddl data
 * @param onselect : function fire on select any value from ddl
 */
const DropDownList = ({
  label,
  data = [],
  onselect,
  value,
  testId,
}: {
  label?: string;
  data: string[];
  onselect: (data: string) => void;
  value: string;
  testId: string;
}) => {
  const onChange = (value: string) => {
    onselect(value);
  };

  const options = data.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  return (
    <div className="dropDown__container" data-testid={testId}>
      {label ? <span className="dropDown__label">{label}</span> : ""}
      <Select
        value={value}
        onChange={onChange}
        style={{
          width: "60%",
        }}
        options={options}
        filterOption={true}
        showSearch={true}
        optionFilterProp={"children"}
      />
    </div>
  );
};

export default React.memo(DropDownList);
