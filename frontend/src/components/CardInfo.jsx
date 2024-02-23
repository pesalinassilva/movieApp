import axios from "axios"
import { ENDPOINT, URLPOSTER } from "../config/constants"
import { Link, useNavigate } from "react-router-dom"
import MovieContext from "../context/MovieContext"
import { useContext } from "react"

const CardInfo = ( {info} ) => {
    const navigate = useNavigate()
    const { handleFavorites, favorites,userInfo } = useContext(MovieContext)
    
    const getFavContent = () => {
        handleFavorites({
            userId: userInfo.id,
            serieId: info.id,
            name: info.name,
            overview: info.overview,
            poster: info.poster_path,
            first_air_date: info.first_air_date
        })
    }

    const saveFavContent = () => {
        if(userInfo){
            getFavContent
            axios.post(ENDPOINT.favorites, favorites)
            .then(() => {
                window.alert('Favorito guardado con éxito!')
            })
            .catch(({ response: { data } }) => {
                console.error(data)
                window.alert(`${data.message} 🙁.`)
            })
        }
        else{
            alert('Debes registrarte para poder guardar películas B)')
            navigate('/signin')
        }
    }

    return (
        <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
            <img src={`${URLPOSTER}${info.poster_path}`} className="card-img" alt={`${info.title}s poster`}/>
            <div className="card-body">
                <h5 className="card-title">{info.name}</h5>
                <p className="card-text">{info.release_date}</p>
                <p className="card-text"><small>{info.vote_average}</small></p>
                <Link to='/detail' className='btn btn-primary register-btn'>Detalles</Link>
                <button onClick={saveFavContent} className="btn btn-outline-secondary" type="button" id="button-addon2">Save</button>
            </div>
        </div>
    )
}

export default CardInfo