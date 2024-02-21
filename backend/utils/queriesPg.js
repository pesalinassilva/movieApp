const axios = require('axios')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const { BBDD } = require('../config/constants.js')

const pool = new Pool ({
    host: BBDD.host,
    user: BBDD.user,
    password: BBDD.password,
    database: BBDD.database,
    allowExitOnIdle: true
})

const apiURL = 'https://api.themoviedb.org/3'

const showMovies = async() => {
    const response = await axios.get(`${apiURL}/movie/top_rated?page=01&api_key=cf08696c1d908dffc3b1a61b81eacbaa`)
    return response.data.results
}

//crear usuario
const signInUser = async(user) => {
    let { user_name, email, password } = user
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [user_name, email, password]
    const consulta = "INSERT INTO users values (DEFAULT, $1, $2, $3)"
    await pool.query(consulta,values)
}

//authenticar usuario
const logInUser = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM users WHERE email = $1"
    const { rows: [user], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = user
    const passwordCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordCorrecta || !rowCount)
        throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }
    
    if (!passwordCorrecta)
        throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }
}

//ver perfil de usuario
const userData = async (email) => {
    try {
        const consulta = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const { rows, rowCount } = await pool.query(consulta, values)
        if (rowCount === 0) {
            throw { code: 404, message: "Usuario no encontrado" }
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}

//eliminar de favoritos
const deleteFromFavorites = async(content, user) => {
    try {
        let { serie_id } = content
        const consulta = "DELETE FROM series_by_user WHERE id_user_liked = $1 AND serie_id = $2"
        const values = [user.id, serie_id]
        const { rows, rowCount } = await pool.query(consulta, values)
        if (rowCount === 0) {
            throw { code: 404, message: "No se encontro ningún registro con los criterios indicados" }
        }
    } catch (error) {
        throw error;
    }
}

//listar peliculas y series favoritas
const showFavorites = async(id) => {
    try {
        const consulta = "SELECT * FROM series_by_user WHERE id = $1"
        const values = [id]
        const { rows, rowCount } = await pool.query(consulta, values)
        if (rowCount === 0) {
            throw { code: 404, message: "Usuario no tiene series favoritas :c" }
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}

//buscar peliculas y series
const searchMoviesAndSeries = async(name) => {
    let nameQuery = name.replace(/ /g, "+")
    const response = await axios.get(`${apiURL}/search/multi?query=${nameQuery}&api_key=cf08696c1d908dffc3b1a61b81eacbaa`)
    console.log(response.data.results.length)
    return response.data.results
}

//registrar en tabla SQL.
const saveToFavorites = async(content) => {
    let { id, name, overview, poster_path, media_type } = content
    if (media_type === 'movie'){
        let { release_date } = content
        const values = [id, name, overview, poster_path, release_date]
        const consulta = "INSERT INTO movies_by_user values (DEFAULT, 1, $1, $2, $3, $4, $5)"
        console.log(values)
        await pool.query(consulta,values)
    } else if(media_type === 'tv'){
        let { first_air_date } = content
        const values = [id, name, overview, poster_path, first_air_date]
        const consulta = "INSERT INTO series_by_user values (DEFAULT, 1, $1, $2, $3, $4, $5)"
        console.log(values)
        await pool.query(consulta,values)
    }
}

//Editar usuario
const editUser = async() => {

}


module.exports = { showMovies, searchMoviesAndSeries, showFavorites, saveToFavorites, signInUser, logInUser, userData, deleteFromFavorites, editUser }