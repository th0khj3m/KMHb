import React from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../store/search/search.actions";
import { setSearchQuery } from "../store/search/search.reducers";

const Search = () => {
  const dispatch = useDispatch();
  const { query, results, loading } = useSelector((state) => state.search);

  const handleSearch = async (event, newValue) => {
    dispatch(setSearchQuery(newValue));
    if (newValue) {
      try {
        await dispatch(searchMovies(newValue));
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }
  };

  console.log(results);

  return (
    <Autocomplete
      value={query}
      freeSolo
      onChange={handleSearch}
      options={results}
      getOptionLabel={(option) => option?.title}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          size="small" // Set size to small
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: { backgroundColor: "white" }, // White background
            borderRadius: "20px", // Add border radius
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="main" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            style: { padding: "8px 12px", fontSize: "14px" }, // Adjust padding and font size
          }}
        />
      )}
    />
  );
};

export default Search;
