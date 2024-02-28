import axios from 'axios'
import { useContext, useState } from 'react'
import { ENDPOINT } from '../config/constants'

import MovieContext from "../context/MovieContext"
import ContentCard from '../components/ContentCard'

const SearchResults = () => {
    const { userInfo } = useContext(MovieContext)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    const handleSearch = (event) => setSearch(event.target.value)
    
    const getSearchResults = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get(`${ENDPOINT.search}?search=${search}`)
            setSearchResults(response.data)
        } catch (error) {
            console.error("Error searching in movie data:", error.message)
        }
    }
    
    const favoritesByUser = userInfo ? userInfo.favorites : []
    const userTvShows = favoritesByUser.filter(item => item.media_type === "tv").map(item => item.content_id)
    const userMovies = favoritesByUser.filter(item => item.media_type === "movie").map(item => item.content_id)

    return(
        <div>
            <form onSubmit={getSearchResults} className="col-10 col-sm-6 col-md-3 m-auto mt-5">
                <div className='form-group mt-1 '>
                    <label>Search</label>
                    <input
                        value={search}
                        onChange={handleSearch}
                        type='text'
                        name='search'
                        className='form-control'
                        placeholder='Search for Movies or Tv Shows B)'
                    />
                </div>
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
            </form>
            <div className="container">
                <div className="row gap-5">
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
                        <h1>Aca apareceran tus resultados B)</h1>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default SearchResults