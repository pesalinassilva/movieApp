import axios from "axios"
import { ENDPOINT, URLPOSTER } from "../config/constants"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import ContentDetail from "./ContentDetails"
import NotificationAlert from "./NotificationAlert"
import MovieContext from "../context/MovieContext"

const ContentCard = ( {contentInfo, isFavorite = null} ) => {
    const navigate = useNavigate()
    const { userInfo, setUserInfo } = useContext(MovieContext)
    const [show, setShow] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const user = userInfo ? userInfo.user : null

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const handleCloseAlert = () => setShowAlertMessage(false)

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
                    setShowAlertMessage(true)
                    setAlertMessage('Contenido guardado con éxito! 🥳')
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
                    setShowAlertMessage(true)
                    setAlertMessage('Contenido eliminado de tus favoritos 🫣')
                }).catch(({ response: { data } }) => {
                    console.error(data);
                    window.alert(`${data.message} 🙁.`)
                })
                const newFavorites = userInfo.favorites.filter(fav => 
                    !(fav.content_id === payload.content_id && fav.media_type === payload.media_type)
                )
                setUserInfo({user, favorites:newFavorites})
            }
        }
        else{
            alert('Debes registrarte para poder guardar películas B)')
            navigate('/signin')
        }
    }

    return(
        <div className="card col-md-4 mb-3" style={{ width: "18rem", backgroundColor:'#0a022a'}}>
            <img src={contentInfo.poster_path ? `${URLPOSTER}${contentInfo.poster_path}`: '/not_available.jpeg'} className="card-img my-2" alt={`${contentInfo.title}s poster`}/>
            <h5 className="card-title text-center text-light">{contentInfo.name ? contentInfo.name : contentInfo.title}</h5>
            <h6 className="card-subtitle text-center text-light">{contentInfo.release_date ? contentInfo.release_date : contentInfo.first_air_date}</h6>
            <div className="card-body align-items-end">
                <div className="d-flex justify-content-center">
                    <small className="text-light me-3 mb-3">{contentInfo.media_type ? contentInfo.media_type : 'Movie'}</small>
                    <p className="card-text text-light"><small>{contentInfo.vote_average ? Math.round(contentInfo.vote_average*10)/10 : null}</small></p>
                </div>
                <button onClick={handleShow} className="btn btn-primary btn-sm me-1 ms-2" type="button">Detalles</button>
                <button onClick={saveOrDeleteFavContent} className={`btn btn-sm ${isFavorite ? 'btn-outline-danger' : 'btn-outline-success'}`} type="button" id="button-addon2">{isFavorite ? "Quitar de Favoritos" : "Agregar a favorito "}</button>
            </div>
            <ContentDetail 
                show={show}
                handleClose={handleClose}
                content={contentInfo}
            />
            <NotificationAlert 
                showAlert={showAlertMessage}
                handleClose={handleCloseAlert}
                message={alertMessage}
            />
        </div>
    )
}

export default ContentCard