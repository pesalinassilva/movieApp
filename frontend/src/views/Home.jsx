import axios from "axios";
import { ENDPOINT } from "../config/constants"
import { useEffect, useState } from "react";
import CardInfo from "../components/CardInfo";

//import MovieContext from "../context/MovieContext";


const Home = () => {
    const [movies, setMovies] = useState([])
    
    const getMovieData = async () => {
        try {
            const response = await axios.get(ENDPOINT.home);
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }
    
    useEffect(() => {
        getMovieData()
    }, [])

    return(
        <>
            {movies.map((movie,index) => (
                <CardInfo
                    key={index}
                    image={movie.poster_path} 
                    name={movie.title}
                    release_date={movie.release_date}
                    rate={movie.vote_average}
                />
            ))}      
        </>
    )
}

export default Home