import axios from 'axios'
import { useEffect, useState } from 'react'
import { ENDPOINT } from '../config/constants'
import { useNavigate } from 'react-router-dom'


const initialForm = {
    user_name: 'username',
    email: 'ejemplo@correo.com',
    password: '123456'
}

const Signin = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(initialForm)

    const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

    const handleForm = (event) => {
    event.preventDefault()

    axios.post(ENDPOINT.signin, user)
        .then(() => {
            window.alert('Usuario registrado con éxito 😀.')
            navigate('/login')
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
        <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
            <h1>Registrar nuevo usuario</h1>
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
            <button type='submit' className='btn btn-light mt-3'>Registrarme</button>
        </form>
    )
}

export default Signin