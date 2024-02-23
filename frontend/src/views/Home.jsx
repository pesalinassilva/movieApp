import axios from "axios";
import { ENDPOINT } from "../config/constants"
import { useEffect, useState } from "react";
import CardInfo from "../components/CardInfo";

//import MovieContext from "../context/MovieContext";

const Home = () => {
    const [movies, setMovies] = useState([])
    
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
    
    return(
        <div className="container">
            <h1>Top Rated Movies</h1>
            <div className="row gap-5">
                {movies.map((movie,index) => (
                    <CardInfo
                        key={index}
                        info={movie}
                    />
                ))}      
            </div>
        </div>
    )
}

export default Home