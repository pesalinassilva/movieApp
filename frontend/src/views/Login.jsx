import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constants.js'
import MovieContext from '../context/MovieContext'
import NotificationAlert from '../components/NotificationAlert.jsx'

const initialForm = { email: '', password: '' }

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
            <NotificationAlert 
                showAlert={showAlertMessage}
                handleClose={handleCloseAlert}
                message={alertMessage}
            />

        </div>
    )
}

export default Login