import { URLPOSTER } from "../config/constants"
import { Link } from "react-router-dom"

const CardInfo = ( {info, isFavorite = null} ) => {
    console.log(isFavorite)
    return (
        <div className="card col-md-4 mb-3" style={{ width: "14rem" }}>
            <img src={`${URLPOSTER}${info.poster_path}`} className="card-img" alt={`${info.title}s poster`}/>
            <div className="card-body">
                <h5 className="card-title">{info.name}</h5>
                <p className="card-text">{info.release_date}</p>
                <p className="card-text"><small>{info.vote_average}</small></p>
                <Link to='/detail' className='btn btn-primary register-btn'>Detalles</Link>
                <button  className="btn btn-outline-secondary" type="button" id="button-addon2">{isFavorite ? "Quitar de Favoritos" : "Agregar a favorito "}</button>
            </div>
        </div>
    )
}

export default CardInfo