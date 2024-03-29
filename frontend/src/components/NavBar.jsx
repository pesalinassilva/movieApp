import { useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import MovieContext from "../context/MovieContext"

const NavBar = () => {
    const navigate = useNavigate()
    const { setUserInfo, userInfo } = useContext(MovieContext)
    
    const logout = () => {
        setUserInfo()
        window.sessionStorage.removeItem('token')
        navigate('/')
    }
    
    const isLogin = () => {
        if (!userInfo) {
            return (
            <>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li>
                            <Link to='/search' className='btn btn-outline-primary register-btn me-1'>Buscar</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/signin' className='btn btn-outline-primary register-btn me-1'>Registrarse</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className='btn btn-outline-primary login-btn'>Iniciar Sesión</Link>
                        </li>
                    </ul>
                </div>
            </>
            )
        }
    
        return (
            <>
                <div className="collapse navbar-collapse justify-content-end text-light" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/profile' className='btn btn-outline-primary m-1 register-btn'>Perfil</Link>
                            <Link to='/favorites' className='btn btn-outline-primary m-1 register-btn'>Favoritos</Link>
                            <Link to='/search' className='btn btn-outline-primary m-1 register-btn'>Buscar</Link>
                            <button onClick={logout} className='btn btn-danger'>Salir</button>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    return(
        <>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#100219'}}>
            <div className="container-fluid">
                <Link to='/' className='btn m-1 register-btn text-light'>
                    <img src="/movie_app_logo.png"/>
                </Link>
                <Link to='/popular_movies' className='btn mt-3 register-btn text-light'>
                    <p>Popular Movies</p>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {isLogin()}
            </div>
        </nav>
        </>
    )
}

export default NavBar