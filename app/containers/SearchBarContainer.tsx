import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/todoSlice";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";

const SearchBarContainer = () => {
  const [searchTerm, setLocalSearchTerm] = useState("");
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <SearchBar
      searchTerm={searchTerm}
      onSearchChange={(e) => setLocalSearchTerm(e.target.value)}
    />
  );
};

export default SearchBarContainer;
