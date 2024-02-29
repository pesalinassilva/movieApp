export const URLBASE = 'http://localhost:3000'

export const URLPOSTER = 'https://image.tmdb.org/t/p/w500'

export const ENDPOINT = {
    home: `${URLBASE}/get_top_rated_movies`,
    login: `${URLBASE}/log_in`,
    signin: `${URLBASE}/sign_in`,
    profile: `${URLBASE}/profile`,
    favorites: `${URLBASE}/favorites`,
    search: `${URLBASE}/get_search`,
    saveFavorites: `${URLBASE}/save_favorites`,
    details: `${URLBASE}/content_details`,
    deleteFromFav: `${URLBASE}/delete_from_favorites`
}