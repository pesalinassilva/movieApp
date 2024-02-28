import axios from "axios"
import { ENDPOINT, URLPOSTER } from "../config/constants"
import { useNavigate } from "react-router-dom"
import MovieContext from "../context/MovieContext"
import { useContext, useState } from "react"
import ContentDetail from "./ContentDetails"

const ContentCard = ( {contentInfo, isFavorite = null} ) => {
    const navigate = useNavigate()
    const { userInfo, setUserInfo } = useContext(MovieContext)
    const [show, setShow] = useState(false)

    const user = userInfo ? userInfo.user : null

    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
    }

    const saveOrDeleteFavContent = () => {
        if (user){
            const payload = {
                user_id: user.id,
                content_id: contentInfo.id ? contentInfo.id : contentInfo.content_id,
                media_type: (contentInfo.media_type === 'movie' || !contentInfo.media_type )? 'movie' : 'tv',
                name: contentInfo.title ? contentInfo.title : contentInfo.name,
                poster_path: contentInfo.poster_path,
                release_date: contentInfo.release_date ? contentInfo.release_date : contentInfo.first_air_date
            }

            if(!isFavorite){
                axios.post(ENDPOINT.saveFavorites, payload)
                .then(() => {
                    window.alert('Contenido guardado con éxito!')
                })
                .catch(({ response: { data } }) => {
                    console.error(data)
                    window.alert(`${data.message} 🙁.`)
                })
    
                const newFavorites = [
                    ...userInfo.favorites, payload
                ]
                setUserInfo({...userInfo, favorites:newFavorites})
            }else{
                axios.delete(ENDPOINT.deleteFromFav, { data: payload })
                .then(() => {
                    window.alert('Contenido eliminado con éxito');
                }).catch(({ response: { data } }) => {
                    console.error(data);
                    window.alert(`${data.message} 🙁.`)
                })
                const newFavorites = userInfo.favorites.filter(fav => 
                    !(fav.content_id === payload.content_id && fav.media_type === payload.media_type)
                )
                setUserInfo({userInfo, favorites:newFavorites})
            }
        }
        else{
            alert('Debes registrarte para poder guardar películas B)')
            navigate('/signin')
        }
    }

    return(
        <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
            <img src={`${URLPOSTER}${contentInfo.poster_path}`} className="card-img" alt={`${contentInfo.title}s poster`}/>
            <div className="card-body">
                <h5 className="card-title">{contentInfo.name}</h5>
                <p className="card-text">{contentInfo.release_date}</p>
                <small>{contentInfo.media_type ? contentInfo.media_type : 'movie'}</small>
                <p className="card-text"><small>{contentInfo.vote_average}</small></p>
                <button onClick={handleShow} className="btn btn-outline-secondary" type="button" id="button-addon2">Ver Detalles</button>
                <button onClick={saveOrDeleteFavContent} className="btn btn-outline-secondary" type="button" id="button-addon2">{isFavorite ? "Quitar de Favoritos" : "Agregar a favorito "}</button>
            </div>
            <ContentDetail 
                show={show}
                handleClose={handleClose}
                content={contentInfo}
            />
        </div>
    )
}

export default ContentCard