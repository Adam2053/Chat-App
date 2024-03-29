import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import bg from '../../assets/socialmedia07.jpg'


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

    // shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg login-container bg-sky-200'>
                <h1 className='text-3xl font-semibold text-center text-black'>
                    Login
                    <span className='text-yellow-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Username</span>
                        </label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Enter username' className='w-full input input-bordered h-10 bg-slate-900' />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-black text-base label-text'>Password</span>
                        </label>
                        <input
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10 bg-slate-900'
                        />
                    </div>
                    <Link to='/signup' className='text-black text-sm  hover:underline hover:text-yellow-500 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button disabled={loading} className='btn btn-block btn-sm mt-2 bg-slate-900'>
                            {loading ? <span className=' loading loading-spinner' ></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login



