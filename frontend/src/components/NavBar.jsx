import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import { Link, useNavigate } from 'react-router-dom'


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
                            <Link to='/search' className='btn register-btn'>Buscar</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/signin' className='btn register-btn'>Registrarse</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className='btn login-btn'>Iniciar Sesión</Link>
                        </li>
                    </ul>
                </div>
            </>
            )
        }
    
        return (
            <>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/profile' className='btn m-1 register-btn'>Bienvenido {userInfo?.user?.user_name}!</Link>
                            <Link to='/favorites' className='btn m-1 register-btn'>Favoritos</Link>
                            <Link to='/search' className='btn m-1 register-btn'>Buscar</Link>
                            <button onClick={logout} className='btn btn-danger'>Salir</button>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    return(
        <>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <Link to='/' className='btn m-1 register-btn text-light'>
                    <h3>Movie App</h3>
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