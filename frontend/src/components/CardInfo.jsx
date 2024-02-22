import { URLPOSTER } from "../config/constants"

const CardInfo = ({ image, name, release_date, rate }) => {
    return (
        <>
        <div className="card text-bg-dark">
            <img src={`${URLPOSTER}${image}`} className="card-img" alt={`${name}s poster`}/>
            <div className="card-img-overlay">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{release_date}</p>
                <p className="card-text"><small>{rate}</small></p>
            </div>
        </div>
        </>
    )
}

export default CardInfo