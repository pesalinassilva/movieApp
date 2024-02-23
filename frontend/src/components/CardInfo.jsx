import { URLPOSTER } from "../config/constants"
import { Link } from "react-router-dom"

const CardInfo = ({ image, name, release_date, rate }) => {
    return (
        <div className="card col-md-4 mb-3" style={{ width: "18rem" }}>
            <img src={`${URLPOSTER}${image}`} className="card-img" alt={`${name}s poster`}/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{release_date}</p>
                <p className="card-text"><small>{rate}</small></p>
                <Link to='/detail' className='btn btn-primary register-btn'>Detalles</Link>
            </div>
        </div>
    )
}

export default CardInfo