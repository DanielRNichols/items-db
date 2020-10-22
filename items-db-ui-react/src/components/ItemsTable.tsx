import React from 'react';
import Item from '../models/item';
import Filter from '../models/Filter';
import FilterSelect from './FilterSelect';

import {FaSync, FaPlus, FaInfo, FaPencilAlt, FaTrash} from 'react-icons/fa';



interface IProps {
  //title: string;
  items: Item[];
  filters: Filter[];
  selectedFilter: Filter | undefined;
  onFilterChanged: (filter: Filter | undefined) => void;
  onRefresh: () => void;
}

const ItemsTable:React.FunctionComponent<IProps> = ({items, filters, selectedFilter, onFilterChanged, onRefresh}) => {
  return (
    <table className="itemsTable table table-striped">
      <thead>
        <tr>
          <th colSpan={4}><FilterSelect filters={filters} selectedFilter={selectedFilter} onSelected={onFilterChanged} /></th>
          <th>
            <button className="btn" onClick={onRefresh}><FaSync style={{color: "blue"}} /></button>
            <button className="btn"><FaPlus style={{color: "blue"}} /></button>
          </th>
        </tr>
        <tr>
          <th>Id</th>
          <th>Tag</th>
          <th>Class</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item) => 
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.tag}</td>
              <td>{item.className}</td>
              <td>{item.description}</td>
              <td>
                <button className="btn"><FaInfo style={{color: "blue"}} /></button>
                <button className="btn"><FaPencilAlt style={{color: "blue"}} /></button>
                <button className="btn"><FaTrash style={{color: "red"}} /></button>
              </td>
            </tr>
          )
        }

      </tbody>
    </table>

  );
}

export default ItemsTable;