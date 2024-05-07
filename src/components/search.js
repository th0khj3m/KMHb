import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Stack,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { debounce } from "lodash-es";
import { searchMovies } from "../store/search/search.actions";
import { setSearchQuery } from "../store/search/search.reducers";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, results, loading } = useSelector((state) => state.search);

  /*
  Debounce function to limit the rate at which the search function
  is invoked (ptimize and prevent unnecessary API requests)
  */

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (newValue) => {
        try {
          await dispatch(searchMovies(newValue));
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      }, 300),
    [dispatch]
  );

  const handleInputChange = async (event, newInputValue, reason) => {
    if (reason === "input") {
      await dispatch(setSearchQuery(newInputValue));
      await debouncedSearch(newInputValue);
    }
  };

  const handleOptionSelected = (event, value) => {
    const linkPath =
      value?.media_type === "movie" || value?.media_type === "tv"
        ? `/movies/${value?.id}`
        : `/casts/${value?.id}`;
    navigate(linkPath);
    dispatch(setSearchQuery("")); // Clear input after searching
  };

  return (
    <Autocomplete
      inputValue={query}
      onInputChange={handleInputChange}
      options={results}
      loading={loading}
      getOptionLabel={(option) => option?.title || option?.name || ""}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Search for a movie, person..."
            InputProps={{
              ...params.InputProps,
              type: "search",
              style: { backgroundColor: "white" },
              borderRadius: "20px",
              endAdornment: (
                <Stack>
                  {loading ? <CircularProgress color="main" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Stack>
              ),
            }}
            inputProps={{
              ...params.inputProps,
              style: { padding: "5px", fontSize: "14px" },
            }}
          />
        );
      }}
      renderOption={(props, option) => {
        const imagePath =
          option?.media_type === "movie"
            ? `https://image.tmdb.org/t/p/w500${option.poster_path}`
            : `https://image.tmdb.org/t/p/w500${option.profile_path}`;
        return (
          <ListItem {...props} key={option?.id}>
            <ListItemButton
              onClick={(event) => handleOptionSelected(event, option)}
            >
              <ListItemAvatar>
                <Avatar
                  src={imagePath}
                  alt={option?.title || option?.name}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText primary={option?.title || option?.name} />
            </ListItemButton>
          </ListItem>
        );
      }}
    />
  );
};

export default Search;
