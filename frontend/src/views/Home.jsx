import axios from "axios";
import { ENDPOINT } from "../config/constants"
import { useContext, useEffect, useState } from "react";
import CardInfo from "../components/CardInfo";
import MovieContext from "../context/MovieContext";

const Home = () => {
    const [movies, setMovies] = useState([])
    const { userInfo } = useContext(MovieContext)
    
    const getMovieData = async () => {
        try {
            const response = await axios.get(ENDPOINT.home)
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movie data:", error)
        }
    }
    
    useEffect(() => {
        getMovieData()
    }, [])
    
    const favoritesByUser  = userInfo ? userInfo.favorites : []
    const userTvShows = favoritesByUser.filter(item => item.content_type === "tv").map(item => item.content_id)
    const userMovies = favoritesByUser.filter(item => item.content_type === "movie").map(item => item.content_id)
    return(
        <div className="container">
            <h1>Top Rated Movies</h1>
            <div className="row gap-5">
                {movies.map((movie,index) => {
                    const isFavorite = userInfo ? (movies.content_type === "tv" ? userTvShows.includes(movie.id) : userMovies.includes(movie.id)) : null
                    return (                
                        <CardInfo
                            key={index}
                            info={movie}
                            isFavorite={isFavorite}
                        />
                    )
                })}      
            </div>
        </div>
    )
}

export default Home