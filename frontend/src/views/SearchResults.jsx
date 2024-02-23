import axios from 'axios'
import { useState } from 'react'
import { ENDPOINT } from '../config/constants'
import CardInfo from '../components/CardInfo'

const SearchResults = () => {
    //const navigate = useNavigate()
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

    const displaySearchResults = () => {
        if (searchResults) {
            return searchResults.map((result, index) => {
                if (result.release_date) {
                    return (
                        <CardInfo
                            key={index}
                            info={result}
                        />
                    )
                } else if (result.first_air_date) {
                    return (
                        <CardInfo
                            key={index}
                            info={result}
                        />
                    )
                }
                return null
            })
        }

        return(
            <h1>Aca apareceran tus resultados B)</h1>
        )
    }

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
                    {displaySearchResults()}
                </div>
            </div>
        </div>
    )
}

export default SearchResults