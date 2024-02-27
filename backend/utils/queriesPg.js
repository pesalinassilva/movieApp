const axios = require('axios')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const { BBDD, APIINFO } = require('../config/constants.js')

const pool = new Pool ({
    host: BBDD.host,
    user: BBDD.user,
    password: BBDD.password,
    database: BBDD.database,
    allowExitOnIdle: true
})

const getTopRated = async() => {
    const response = await axios.get(`${APIINFO.urlBase}/movie/top_rated?page=01&api_key=${APIINFO.key}`)
    return response.data.results
}

const getTopRatedPages = async(page) => {
    const response = await axios.post(`${APIINFO.urlBase}/movie/top_rated?page=${"1"}&api_key=${APIINFO.key}`)
    console.log(response)
    //const response = await axios.post(`https://api.themoviedb.org/3/movie/top_rated?page=${page.page}&api_key=cf08696c1d908dffc3b1a61b81eacbaa`)
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
        const consulta = "SELECT * FROM users WHERE email = $1"
        const { rows:rowUser, rowCount: userCount } = await pool.query(consulta, [email])
        if (userCount === 0) {
            throw { code: 404, message: "Usuario no encontrado" }
        }
        const user = rowUser[0]
        const getFavoritesFromUser = "SELECT id_user_liked, content_id, content_type FROM movies_and_series_by_user WHERE id_user_liked = $1"
        const { rows:rowFavorites } = await pool.query(getFavoritesFromUser, [user.id])
        return {user, favorites: rowFavorites}
    } catch (error) {
        throw error
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
        const consulta = "SELECT * FROM movies_and_series_by_user WHERE id_user_liked = $1"
        const values = [id]
        const { rows, rowCount } = await pool.query(consulta, values)
        if (rowCount === 0) {
            throw { code: 404, message: "Usuario no tiene series favoritas :c" }
        }
        return rows;
    } catch (error) {
        throw error;
    }
}

//buscar peliculas y series
const searchMoviesAndSeries = async(name) => {
    let nameQuery = name.replace(/ /g, "+")
    const response = await axios.get(`${APIINFO.urlBase}/search/multi?query=${nameQuery}&api_key=${APIINFO.key}`)
    return response.data.results
}

//registrar en tabla SQL.
const saveToFavorites = async(content) => {
    let { user_id, content_id, name, overview, poster_path, media_type, release_date } = content
    const values = [ user_id, content_id, media_type, name, poster_path, release_date]
    const consulta = "INSERT INTO movies_and_series_by_user values (DEFAULT, $1, $2, $3, $4, $5, $6)"
    await pool.query(consulta,values)
}

//Detalles de peliculas o series
const getContentDetails = async(content) =>{
    let { content_id, media_type } = content
    const responseContent = await axios.get(`${APIINFO.urlBase}/${media_type}/${content_id}?api_key=${APIINFO.key}`)
    const responseCrew = await axios.get(`${APIINFO.urlBase}/${media_type}/${content_id}/credits?api_key=${APIINFO.key}`)
    const response = [responseContent.data, responseCrew.data]
    return response
} 

//Editar usuario
const editUser = async() => {

}


module.exports = { getTopRated, getTopRatedPages, searchMoviesAndSeries, showFavorites, saveToFavorites, signInUser, logInUser, userData, deleteFromFavorites, editUser, getContentDetails }