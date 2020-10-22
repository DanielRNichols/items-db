import React from 'react';

interface IProps {
  label: string;
  value: string | undefined;
}

const ItemDetailsProperty:React.FunctionComponent<IProps> = ({label, value}) => {

  return (
    <div className="form-group">
      <label>{label}</label>
      <input type="text" readOnly className="form-control" value={value ? value : ""} />
    </div>

  );
}

export default ItemDetailsProperty;