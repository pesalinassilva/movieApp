import axios from "axios";
import { ENDPOINT } from "../config/constants"
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/MovieContext";
import ContentCard from '../components/ContentCard'
import ReactPaginate from 'react-paginate'

const Home = () => {
    const { userInfo } = useContext(MovieContext)
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [cargando, setCargando] = useState(true)
    
    const getMovieData = async () => {
        try {
            const response = await axios.get(`${ENDPOINT.getMovies}?media_type=${'movie'}&section=${'top_rated'}&page=${page}`)
            setMovies(response.data.results)
            setTotalPages(response.data.total_pages)
            setCargando(false)
        } catch (error) {
            console.error("Error fetching movie data:", error)
        }
    }
    
    useEffect(() => {
        getMovieData()
    }, [page])

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1
        setPage(selectedPage)
        window.scrollTo(0, 0)
    }

    const filterContent = (favorites, media_type) => {
        return (favorites.filter(item => item.media_type === media_type).map(item => item.content_id))
    }

    const favoritesByUser = userInfo ? userInfo.favorites : []
    const userTvShows = filterContent(favoritesByUser, 'tv')
    const userMovies = filterContent(favoritesByUser, 'movie')
    
    if (cargando) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-grow text-light m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return(
        <div className="container" style={{ backgroundColor: "#210930" }} >
            <h1 className="text-light text-center my-3">Top Rated Movies</h1>
            <div className="row gap-5 justify-content-center" style={{ backgroundColor: "#210930" }}>
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