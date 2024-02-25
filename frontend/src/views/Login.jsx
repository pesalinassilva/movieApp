import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constants.js'
import MovieContext from '../context/MovieContext'

const initialForm = { email: '', password: '' }

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(initialForm)
    const { setUserInfo } = useContext(MovieContext)

    const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

    const handleForm = async(event) => {
        event.preventDefault()
        try {
            const response = await axios.post(ENDPOINT.login, user)
            const { data } = response;
            window.sessionStorage.setItem('token', data)
            window.alert('Usuario identificado con éxito')
            setUserInfo({})
            navigate('/profile')
        } catch (error) {
            console.error('Error en la solicitud:', error)
            if (error.response) {
                const errorMessage = error.response.data.message
                window.alert(`${errorMessage}`)
            } else {
                window.alert('Ocurrió un error al procesar la solicitud')
            }
        }
    }

    return(
        <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
        <h1>Iniciar Sesión</h1>
        <hr />
        <div className='form-group mt-1 '>
            <label>Email address</label>
            <input
                value={user.email}
                onChange={handleUser}
                type='email'
                name='email'
                className='form-control'
                placeholder='Enter email'
            />
        </div>
        <div className='form-group mt-1 '>
            <label>Password</label>
            <input
                value={user.password}
                onChange={handleUser}
                type='password'
                name='password'
                className='form-control'
                placeholder='Password'
            />
        </div>
        <button type='submit' className='btn btn-light mt-3'>Iniciar Sesión</button>
    </form>
    )
}

export default Login