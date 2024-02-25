import axios from 'axios'
import MovieContext from '../context/MovieContext.js'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
            console.error(error);
            window.sessionStorage.removeItem('token');
            setUserInfo(null);
            navigate('/home');
        });
    }

    useEffect(getUserInfo, [])

    return (
        <div className='py-5'>
            <h1>
                Bienvenido <span className='fw-bold'>{userInfo?.user_name}</span>
            </h1>
            <h3>
                {userInfo?.email}
            </h3>
        </div>
    )
}

export default Profile