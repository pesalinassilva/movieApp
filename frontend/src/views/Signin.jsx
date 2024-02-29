import axios from 'axios'
import { useEffect, useState } from 'react'
import { ENDPOINT } from '../config/constants'
import { Link, useNavigate } from 'react-router-dom'
import NotificationAlert from '../components/NotificationAlert'

const initialForm = {
    user_name: '',
    email: '',
    password: ''
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const Signin = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(initialForm)
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })
    const handleCloseAlert = () => {
        setShowAlertMessage(false)
        navigate('/login')
    }

    const handleForm = (event) => {
        event.preventDefault()
        
        if (
            !user.email.trim() ||
            !user.password.trim() ||
            !user.user_name.trim()
        ) {
            return window.alert('Todos los campos son obligatorias.')
        }

        if (!emailRegex.test(user.email)) {
            return window.alert('El formato del email no es correcto!')
        }

        axios.post(ENDPOINT.signin, user)
            .then(() => {
                setShowAlertMessage(true)
                setAlertMessage('Usuario registrado con éxito 😀.')
            })
            .catch(({ response: { data } }) => {
                console.error(data)
                window.alert(`${data.message} 🙁.`)
            })
    }

    useEffect(() => {
        if (window.sessionStorage.getItem('token')) {
            navigate('/profile')
        }
    }, [])

    return(
        <div>
            <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
                <h1 className='text-center'>Registrar nuevo usuario</h1>
                <hr />
                <div className='form-group mt-1 '>
                    <label>Username</label>
                    <input
                    value={user.user_name}
                    onChange={handleUser}
                    type='text'
                    name='user_name'
                    className='form-control'
                    placeholder='Enter user name'
                    />
                </div>
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
                    <button type='submit' className='btn btn-light'>Registrarme</button>
                    <Link to='/login' className='btn login-btn btn-sm text-secondary'>ó Inicia sesión</Link>
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

export default Signin