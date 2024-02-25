const BBDD = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
}

const APIINFO = {
    key: 'cf08696c1d908dffc3b1a61b81eacbaa',
    urlBase: 'https://api.themoviedb.org/3'
}

module.exports = { BBDD, APIINFO }