import axios from 'axios'
import { useContext, useState } from 'react'
import { ENDPOINT } from '../config/constants'
import ContentCard from '../components/ContentCard'
import ReactPaginate from 'react-paginate'
import MovieContext from "../context/MovieContext"

const SearchResults = () => {
    const { userInfo } = useContext(MovieContext)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const handleSearch = (event) => setSearch(event.target.value)
    
    const getSearchResults = async (event, page=1) => {
        event.preventDefault()
        try {
            const response = await axios.get(`${ENDPOINT.search}?search=${search}&page=${page}`)
            setSearchResults(response.data.results)
            setTotalPages(response.data.total_pages)
            setCurrentPage(page)
        } catch (error) {
            console.error("Error searching in movie data:", error.message)
        }
    }

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1
        getSearchResults(event, selectedPage)
        window.scrollTo(0, 0)
    }
    
    const filterContent = (favorites, media_type) => {
        return (favorites.filter(item => item.media_type === media_type).map(item => item.content_id))
    }

    const favoritesByUser = userInfo ? userInfo.favorites : []
    const userTvShows = filterContent(favoritesByUser, 'tv')
    const userMovies = filterContent(favoritesByUser, 'movie')

    return(
        <div>
            <form onSubmit={getSearchResults} className="col-10 col-sm-6 col-md-3 m-auto mt-5 text-light">
                <div className='form-group mt-1 d-flex flex-column text-center'>
                    <h2 className='mb-2'>Buscar película o Series</h2>
                    <input
                        value={search}
                        onChange={handleSearch}
                        type='text'
                        name='search'
                        className='form-control'
                        placeholder='Search for Movies or Tv Shows B)'
                    />
                    <button className="btn btn-outline-primary mt-2 mb-3" type="submit">Buscar</button>
                </div>
            </form>
            <div className="container">
                <div className="row gap-5 justify-content-center">
                {searchResults ? (
                    searchResults.map((result, index) => {
                        const isFavorite = userInfo ? (result.media_type === "tv" ? userTvShows.includes(result.id) : userMovies.includes(result.id)) : null;
                        return (
                            <ContentCard
                                key={index}
                                contentInfo={result}
                                isFavorite={isFavorite}
                            />
                        );
                    })
                    ) : (
                        <div className='text-center mt-4 text-light'>
                            <h4>Aca apareceran tus resultados 😉</h4>
                        </div>
                    )
                }
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
                        forcePage={currentPage - 1}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchResults