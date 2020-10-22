import React from 'react';
import Item from "../models/item";
import ItemDetailsProperty from './ItemDetailsProperty';
import ItemsView from './ItemsView';


interface IProps {
  item: Item;
}

const ItemDetails:React.FunctionComponent<IProps> = ({item}) => {
  return (

    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{item.tag}</h5>
        <form className="">
          <ItemDetailsProperty label="Id" value={item.id} />
          <ItemDetailsProperty label="Class" value={item.className} />
          <ItemDetailsProperty label="Description" value={item.description} />
          <ItemDetailsProperty label="Manufacturer" value={item.manufacturer} />
        
          {item.properties && item.properties.length > 0 &&
            <div className="form-group">
              <label>Additional Properties</label>
                {Object.keys(item.properties).map((key) => {
                    const value = item.properties ? item.properties[key].toString() : "";
                    return <ItemDetailsProperty key={key} label={key} value={value} />
                  })
                }
            </div>
          }
        </form>
      </div>
    </div>


  );
}

export default ItemDetails;