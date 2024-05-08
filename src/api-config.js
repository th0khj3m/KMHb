const serverUrl = process.env.REACT_APP_SERVER_URL;

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";
const apiKeyParams = `?api_key=${apiKey}`;
const apiRequestParams = `&language=en-US&region=US&page=1`;

export { serverUrl, apiUrl, apiKeyParams, apiRequestParams };
