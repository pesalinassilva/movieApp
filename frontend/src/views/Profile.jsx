import axios from 'axios'
import MovieContext from '../context/MovieContext.js'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constants.js'

const Profile = () => {
    const navigate = useNavigate()
    const { setUserInfo, userInfo } = useContext(MovieContext)
    
    const getUserInfo = () => {
        const token = window.sessionStorage.getItem('token')
        axios.get(ENDPOINT.profile, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
            setUserInfo(data)
        })
        .catch((error) => {
            console.error(error)
            window.sessionStorage.removeItem('token');
            setUserInfo(null)
            navigate('/')
        })
    }

    useEffect(getUserInfo, [])

    return (
        <div className='d-flex justify-content-center flex-column' style={{backgroundColor:'#0a022a'}}>
            <div className="card text-center" style={{width: "100vw", backgroundColor:'#210930'}}>
                <div className="card-body">
                    <h1 className="card-title text-light">Bienvenido <span className='fw-bold text-light'>{userInfo?.user?.user_name}</span></h1>
                    <h5 className="card-text text-light">usuario: {userInfo?.user?.user_name}</h5>
                    <h5 className="card-text text-light">correo: {userInfo?.user?.email}</h5>
                    <Link to='/favorites' className='btn btn-info'>Ir a mis favoritos</Link>
                </div>
            </div>
        </div>
    )
}

export default Profile