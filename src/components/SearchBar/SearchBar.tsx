import React from "react";
import { useState } from "react";
import './SearchBar.css';
import { TripItemType } from "../../types/TripType";
import { initialFilterTypes, search } from "../../helpers/searchHelper";

interface SearchBarProps {
    trips: TripItemType[] | [];
    onChangeFilter: (trips: TripItemType[]) => void;
}
const SearchBar:React.FC<SearchBarProps> = ({trips=[], onChangeFilter }) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectLevel, setSelectLevel] = useState<string>("");
    const [selectDuration, setSelectDuration] = useState<string>("");
 
  const initialState: initialFilterTypes = {
    originalItems: [...trips],
    duration: selectDuration,
    level: selectLevel,
    inputValue: searchQuery,
  };
  
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const searchValues = {
      ...initialState,
      inputValue: e.target.value,
    };
    const filtered = search(searchValues);
    onChangeFilter(filtered);
  };

  const handleDurationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectDuration(e.target.value);
    const searchValues = {
      ...initialState,
      duration: e.target.value,
    };
    const filtered = search(searchValues);
  
    
    onChangeFilter(filtered);
  };

  const handleLevelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLevel(e.target.value);
    const searchValues = {
      ...initialState,
      level: e.target.value,
    };
    const filtered = search(searchValues);
    onChangeFilter(filtered);
  };

    return (
        <>
            <section className="trips-filter">
                <h2 className="visually-hidden">Trips filter</h2>
                <form className="trips-filter__form" autoComplete="off">
                <label className="trips-filter__search input">
                    <span className="visually-hidden">Search by name</span>
                    <input
                    data-test-id="filter-search"
                    name="search"
                    type="search"
                    placeholder="search by title"
                    onChange={handleSearchQuery}
                    />
                </label>
                <label className="select">
                    <span className="visually-hidden">Search by duration</span>
                    <select data-test-id="filter-duration" name="duration" onChange={handleDurationSelect}>
                    <option value="">duration</option>
                    <option value="0_x_5">&lt; 5 days</option>
                    <option value="5_x_10">&lt; 10 days</option>
                    <option value="10_x">&ge; 10 days</option>
                    </select>
                </label>
                <label className="select">
                    <span className="visually-hidden">Search by level</span>
                    <select data-test-id="filter-level" name="level" onChange={handleLevelSelect}>
                    <option value="">level</option>
                    <option value="easy">easy</option>
                    <option value="moderate">moderate</option>
                    <option value="difficult">difficult</option>
                    </select>
                </label>
                </form>
            </section>
        </>
    )
}


export default SearchBar;