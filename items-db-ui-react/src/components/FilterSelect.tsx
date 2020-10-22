import React from 'react';
import Filter from '../models/Filter';

interface IProps {
  filters: Filter[];
  selectedFilter: Filter | undefined;
  onSelected: (filter: Filter | undefined) => void;
}

const FilterSelect:React.FunctionComponent<IProps> = ({filters, selectedFilter, onSelected}) => {
  return (
    <select defaultValue={selectedFilter ? selectedFilter.title : ""} 
            onChange={(e) => onSelected(filters.find(f => f.key === e.target.value))}>
    {filters.map((filter) => 
        <option key={filter.key} value={filter.key}>{filter.title}</option>
      )
    }
    </select>

  );
}

export default FilterSelect;