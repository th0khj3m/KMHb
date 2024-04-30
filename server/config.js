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
  PASS: process.env.OWNER_EMAIL_PASS
}

const GOOGLE = {
  CONSUMER_KEY: process.env.GOOGLE_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.GOOGLE_CONSUMER_SECRET,
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

const FACEBOOK = {
  CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
  CONSUMER_KEY: process.env.FACEBOOK_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.FACEBOOK_CONSUMER_SECRET,
};

export { SERVER_PORT, DB, SESSION_SECRET, GOOGLE, FACEBOOK, CLIENT, OWNER };
