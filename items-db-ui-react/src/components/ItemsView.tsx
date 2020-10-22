import React from 'react';
import Item from "../models/item";
import ItemsList from "./ItemsList";
//import ItemsTable from "./ItemsTable";

interface IProps {
  title: string;
  items: Item[];
  selectedItem: Item | undefined;
  onItemClick: (item: Item) => void;
}

const ItemsView:React.FunctionComponent<IProps> = ({title, items, selectedItem, onItemClick}) => {

  return (
    <ItemsList title={title} 
      items={items} 
      selectedItem={selectedItem} 
      onClick={onItemClick}
    />
  );
}

export default ItemsView;
