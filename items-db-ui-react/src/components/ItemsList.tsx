import React from 'react';
import Item from "../models/item";

interface IProps {
  title: string;
  items: Item[];
  selectedItem: Item | undefined;
  onClick: (item: Item) => void;

}

export const ItemsList:React.FunctionComponent<IProps> = ({title, items, selectedItem, onClick}) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul className="itemsList">
        {items.map((item) => 
          <li className={`item ${selectedItem && selectedItem.id === item.id ? "selectedItem" : ""}`}
             key={item.id}
             onClick={() => onClick(item)}
          >
               {item.tag}
          </li>
        )}
      </ul>
    </div>
  );
}

export default ItemsList;
