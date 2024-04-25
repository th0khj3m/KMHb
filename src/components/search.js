import * as React from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { searchMovies } from "../store/search/search.actions";
import { setSearchQuery } from "../store/search/search.reducers";

const Search = () => {
  const dispatch = useDispatch();
  const { query, results, loading } = useSelector((state) => state.search);

  const handleSearch = async (event, newValue) => {
    if (newValue !== undefined && newValue !== null) {
      dispatch(setSearchQuery(newValue));
      try {
        await dispatch(searchMovies(newValue));
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }
  };

  return (
    <Autocomplete
      value={query ?? ""}
      freeSolo
      onChange={handleSearch}
      options={results}
      getOptionLabel={(option) => option?.title ?? ""}
      loading={loading}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: { backgroundColor: "white" },
            borderRadius: "20px",
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="main" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            style: { padding: "5px", fontSize: "14px" },
          }}
        />
      )}
      // Wrap the option with Link component
      renderOption={(props, option, { inputValue }) => (
        <Link
          to={`/movies/${option.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li {...props}>{option.title}</li>
        </Link>
      )}
    />
  );
};

export default Search;
