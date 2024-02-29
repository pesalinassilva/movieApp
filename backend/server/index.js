const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const { getContent, searchMoviesAndSeries, saveToFavorites, signInUser, logInUser, userData, deleteFromFavorites, getContentDetails } = require('../utils/queriesPg.js')

app.listen(3000, console.log("SERVER ON"))
app.use(cors())
app.use(express.json())

//middleware para verificar token
const verifyToken = (req, res, next) => {
    const Authorization = req.header("Authorization")
    if (!Authorization) {
        return res.status(401).json({ message: "Token de autorización no proporcionado" })
    }

    const token = Authorization.split("Bearer ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token de autorización no válido" })
    }

    jwt.verify(token, "az_AZ", (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token de autorización no válido" })
        }
        req.email = decoded.email
        req.id = decoded.id
        next()
    })
}

//Mostrar un listado de peliculas.
app.get('/get_movies', async(req, res) => {
    try {
        const {media_type, section, page} = req.query
        const movies = await getContent(media_type, section, page)
        res.json(movies)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Registrar usuarios
app.post('/sign_in', async (req, res) => {
    try {
        const user = req.body
        await signInUser(user)
        res.send('Usuario creado con éxito')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Autenticar usuario
app.post('/log_in', async (req, res) => {
    try {
        const { email, password } = req.body
        await logInUser(email, password)
        const token = jwt.sign({ email }, "az_AZ", { expiresIn: 1800 })
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})

//validar usuario para ver perfil
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const usuario = await userData(req.email);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error("Error en el endpoint GET /profile:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
})

//Buscar pelicula o serie según nombre en la api
app.get('/get_search', async(req, res) => {
    try {
        const { search, page } = req.query
        const searchResult = await searchMoviesAndSeries(search, page)
        res.json(searchResult)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//registrar peliculas en la DDBB
app.post('/save_favorites', async(req, res) => { 
    try {
        const content = req.body
        await saveToFavorites(content)
        res.json('Contenido registrado con éxito')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//endpoint para delete.
app.delete('/delete_from_favorites', async(req, res) => {
    try {
        const content = req.body
        await deleteFromFavorites(content)
        res.json('Contenido eliminado de los favoritos')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/content_details', async(req, res) => {
    try {
        const content = req.body 
        const contentDetails = await getContentDetails(content)
        res.json(contentDetails)
    } catch (error) {
        res.status(400).send(error.message)
    }
})