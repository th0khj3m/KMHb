const SERVER_PORT = process.env.SERVER_PORT;

const DB = {
    HOST: process.env.PGHOST,
    USER: process.env.PGUSER,
    DATABASE: process.env.PGDATABASE,
    PASSWORD: process.env.PGPASSWORD,
    PORT: process.env.PGPORT
}

export { SERVER_PORT, DB }