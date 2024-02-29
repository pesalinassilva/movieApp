import { useContext } from "react"
import MovieContext from "../context/MovieContext"
import ContentCard from "../components/ContentCard"

const Favorites = () => {
    const { userInfo } = useContext(MovieContext)

    const favoritesByUser = userInfo ? userInfo.favorites : []

    return(
        <div className="container text-light text-center">
        <h1 className="my-3">Mis Favoritos</h1>
        {favoritesByUser.length > 0 ? 
        (<div className="row gap-5">
            {favoritesByUser.map((fav,index) => {
                const {content_id , id_user_liked, media_type, name, poster_path, release_date } = fav
                const infoFav = {content_id , id_user_liked, media_type, name, poster_path, release_date}
                return (                
                    <ContentCard
                        key={index}
                        contentInfo={infoFav}
                        isFavorite={true}
                    />
                )
            })}      
        </div>)
        : (<h3 className="text-light-emphasis">Aca apareceran tus favoritos, agrega todos los que quieras!</h3>)
        }
    </div>
    )
}

export default Favorites