import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'

const Signup = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser } = UserAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    setError('')
    try {
      await createUser(data.email, data.password)
      navigate('/account')
    } catch (e) {
      setError("Tạo tài khoản thất bại")
    }
  }, data => {
    const password = getValues('password')
    console.log(password)
  })

  // const formValues = watch()
  // console.log(formValues)
  return (
    <section className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 my-20 mx-auto lg:py-0">
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a> */}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign up for a free
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <input {...register('email', {
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
              })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email" />
              <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.email?.message}</div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input {...register('password', {
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
                type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
              <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.password?.message}</div>
            </div>
            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <input {...register('confirm_password', {
                required: {
                  value: true,
                  message: 'Nhập lại password là bắt buộc'
                },
                maxLength: {
                  value: 160,
                  message: 'Độ dài từ 6-160 ký tự'
                },
                minLength: {
                  value: 6,
                  message: 'Độ dài từ 6-160 ký tự'
                },
                validate: value => {
                  if (value === getValues('password')) {
                    return true
                  }
                  return 'Nhập lại password không khớp'
                }
              })}
                type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
              <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.confirm_password?.message}</div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
              </div>
            </div>
            <button type="submit" className="border w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
            <div className='mt-1 text-md text-red-600'>{error}</div>
            <p className="text-sm font-light text-gray-500">
              Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline">Sign in here.</Link>
            </p>
          </form>
        </div>
      </div>
    </section >
  );
};

export default Signup;
