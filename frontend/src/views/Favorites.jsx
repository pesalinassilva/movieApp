import { useContext } from "react"
import MovieContext from "../context/MovieContext"
import ContentCard from "../components/ContentCard"

const Favorites = () => {
    const { userInfo } = useContext(MovieContext)

    const favoritesByUser = userInfo ? userInfo.favorites : []

    console.log(userInfo)
    return(
        <div className="container text-light text-center">
        <h1 className="my-3">Mis Favoritos</h1>
        <div className="row gap-5">
            {favoritesByUser.map((fav,index) => {
                const {content_id , id_user_liked, media_type, name, poster_path, release_date } = fav
                const infoFav = {content_id , id_user_liked, media_type, name, poster_path, release_date}
                console.log(infoFav, 'infofav')
                return (                
                    <ContentCard
                        key={index}
                        contentInfo={infoFav}
                        isFavorite={true}
                    />
                )
            })}      
        </div>
    </div>
    )
}

export default Favorites