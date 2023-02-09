import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const { signIn } = UserAuth()

    const [value, setValue] = useState('')

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        setError('')
        try {
            await signIn(data.email, data.password)
            navigate('/account')
        } catch (e) {
            setError("Tài khoản hoặc mật khẩu không chính xác!")
        }
    })

    const handleGoogleSignInClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
            navigate('/account')
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div className="px-6 h-full text-gray-800 max-w-[1024px] mx-auto my-20 p-4">
            <div
                className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
            >
                <div
                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample image"
                    />
                </div>
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-row items-center justify-center lg:justify-start mb-4">
                            <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
                        </div>


                        <div className="mb-6">
                            <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="email"
                                placeholder="Email address"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email là bắt buộc'
                                    },
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Email không đúng định dạng'
                                    },
                                    maxLength: {
                                        value: 160,
                                        message: 'Độ dài từ 5-160 ký tự'
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'Độ dài từ 5-160 ký tự'
                                    }
                                })}
                            />
                            <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.email?.message}</div>
                        </div>


                        <div className="mb-6">
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password là bắt buộc'
                                    },
                                    maxLength: {
                                        value: 160,
                                        message: 'Độ dài từ 6-160 ký tự'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Độ dài từ 6-160 ký tự'
                                    }
                                })}
                            />
                            <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.password?.message}</div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    id="exampleCheck2"
                                />
                                <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                                >Remember me</label
                                >
                            </div>
                            <a href="#!" className="text-gray-800">Forgot password?</a>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className='flex '>
                                <button
                                    type='submit'
                                    className="px-8 py-3 text-white bg-blue-300 rounded focus:outline-none"
                                    disabled
                                >
                                    Login
                                </button>
                                <GoogleButton className='grow ml-4'
                                    onClick={() => handleGoogleSignInClick()}
                                />
                            </div>

                            <div className='mt-1 min-h-[1.5rem] text-md text-red-600'>{error}</div>
                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                Don't have an account? {" "}
                                <Link to="/signup" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register.</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin