const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";
const apiKeyParams = `?api_key=${apiKey}&language=en-US`;
const apiRequestParams = `&page=1&region=US`

export { apiUrl, apiKeyParams, apiRequestParams }