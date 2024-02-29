import axios from "axios";
import { ENDPOINT } from "../config/constants"
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/MovieContext";
import ContentCard from '../components/ContentCard'
import ReactPaginate from 'react-paginate'

const Home = () => {
    const { userInfo } = useContext(MovieContext)
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState({page:1});
    const [totalPages, setTotalPages] = useState(0);
    
    const getMovieData = async () => {
        try {
            const response = await axios.post(ENDPOINT.home, page)
            setMovies(response.data.results)
            setTotalPages(response.data.total_pages)
        } catch (error) {
            console.error("Error fetching movie data:", error)
        }
    }
    
    useEffect(() => {
        getMovieData()
    }, [page])

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1
        setPage({page:selectedPage})
    }

    const favoritesByUser = userInfo ? userInfo.favorites : []
    const userTvShows = favoritesByUser.filter(item => item.media_type === "tv").map(item => item.content_id)
    const userMovies = favoritesByUser.filter(item => item.media_type === "movie").map(item => item.content_id)
    
    return(
        <div className="container">
            <h1>Top Rated Movies</h1>
            <div className="row gap-5">
                {movies.map((movie,index) => {
                    const isFavorite = userInfo ? (movies.media_type === "tv" ? userTvShows.includes(movie.id) : userMovies.includes(movie.id)) : null
                    return (                
                        <ContentCard
                            key={index}
                            contentInfo={movie}
                            isFavorite={isFavorite}
                        />
                    )
                })}      
            </div>
            <div className='pagination-container'>
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
            />
        </div>
        </div>
    )
}

export default Home