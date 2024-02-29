const BBDD = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
}

const APIINFO = {
    key: process.env.API_KEY,
    urlBase: 'https://api.themoviedb.org/3'
}

module.exports = { BBDD, APIINFO }