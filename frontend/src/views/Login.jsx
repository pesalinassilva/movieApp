import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constants.js'
import MovieContext from '../context/MovieContext'
import NotificationAlert from '../components/NotificationAlert.jsx'

const initialForm = { email: '', password: '' }
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(initialForm)
    const { setUserInfo } = useContext(MovieContext)
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

    const handleCloseAlert = () => {
        setShowAlertMessage(false)
        navigate('/profile')
    }

    const handleForm = async(event) => {
        event.preventDefault()
        if (!user.email.trim() || !user.password.trim()) {
            return window.alert('Email y password obligatorias.')
        }
    
        if (!emailRegex.test(user.email)) {
            return window.alert('El formato del email no es correcto!')
        }
        try {
            const response = await axios.post(ENDPOINT.login, user)
            const { data } = response
            setShowAlertMessage(true)
            setAlertMessage('Usuario identificado con éxito 😎')
            window.sessionStorage.setItem('token', data)
            setUserInfo({})
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
        <div>
            <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5 text-light'>
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
            <div className='d-flex justify-content-center mt-3'>
            <button type='submit' className='btn btn-light'>Iniciar Sesión</button>
                <Link to='/login' className='btn login-btn btn-sm text-secondary'>O Registrate!</Link>
            </div>
        </form>
            <NotificationAlert 
                showAlert={showAlertMessage}
                handleClose={handleCloseAlert}
                message={alertMessage}
            />

        </div>
    )
}

export default Login