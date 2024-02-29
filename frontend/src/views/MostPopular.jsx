import axios from "axios";
import { ENDPOINT } from "../config/constants"
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/MovieContext";
import ContentCard from '../components/ContentCard'
import ReactPaginate from 'react-paginate'

const MostPopular = () => {
    const { userInfo } = useContext(MovieContext)
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [cargando, setCargando] = useState(true)
    
    const getMovieData = async () => {
        try {
            const response = await axios.get(`${ENDPOINT.getMovies}?section=${'popular'}&page=${page}`)
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

    const favoritesByUser = userInfo ? userInfo.favorites : []
    const userTvShows = favoritesByUser.filter(item => item.media_type === "tv").map(item => item.content_id)
    const userMovies = favoritesByUser.filter(item => item.media_type === "movie").map(item => item.content_id)
    
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
            <h1 className="text-light text-center my-3">Most Popular Movies</h1>
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

export default MostPopular