const SESSION_SECRET = process.env.SESSION_SECRET;
const SERVER_PORT = process.env.SERVER_PORT;

const CLIENT = {
  URL: process.env.CLIENT_URL,
};

const DB = {
  HOST: process.env.PGHOST,
  USER: process.env.PGUSER,
  DATABASE: process.env.PGDATABASE,
  PASSWORD: process.env.PGPASSWORD,
  PORT: process.env.PGPORT,
};

const OWNER = {
  EMAIL: process.env.OWNER_EMAIL,
  PASS: process.env.OWNER_EMAIL_PASS,
};

export { SERVER_PORT, DB, SESSION_SECRET, CLIENT, OWNER };
