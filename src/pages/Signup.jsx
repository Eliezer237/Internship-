import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-hot-toast';

const Signup = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
	const [data,setData]=useState({
		email:'',
		password:'',
	})
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [emailExists,setEmailExists]=useState('');
  const navigate = useNavigate();

 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    if (!data.email || !data.password || !confirmPassword) {
      setError('All fields are required!');
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (data.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (!/[A-Z]/.test(data.password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }

    if (!/[0-9]/.test(data.password)) {
      setError('Password must contain at least one number');
      return false;
    }

    if (data.password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };
const chekEmailExistence=async()=>{
try{
	const response=await axios.post('/check-email',{email:data.email});
	if(response.data.exists){
		setEmailExists(true);
		setError('Emial is already taken!')
	}
	else{
		setEmailExists(false);
	}
}
	catch(error){
  console.log("Error checking email",error);
 setError('Email is already taken!!');
	}
}

  const registerUser = async (e) => {
    e.preventDefault();
		const {email,password}=data;
    setError('');
await chekEmailExistence();
if(emailExists) return;
    if (!validateForm()) return;

    try {
      const {data} = await axios.post(
        "/register",{
					email,password
				})
				if(data.error){
					toast.error(data.error)
				}else{
					setData({});
					toast.success('Register successful welcome!');
					navigate('/')
				}
      
  }
	catch(error){
		console.log(error.response ? error.response.data : error.message);
	};
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-fixed bg-cover bg-center bg-[url('/src/Assets/images/3.jpeg')]">
      <div className="bg-white/80 p-8 rounded-3xl shadow-xl w-110 h-[600px] mx-4 ml-220">
        <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={registerUser}>
          {/* Email Input */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border"
              placeholder="name@example.com"
              value={data.email}
              onChange={(e) => setData({...data,email:e.target.value})}
            />
          </div>

          {/* Password Input */}
          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password (min 8 chars with uppercase and number)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 pr-12"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData({...data,password:e.target.value})}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 pr-12"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up Now
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Already have an account? </span>
          <Link 
            to="/" 
            className="text-blue-600 font-semibold hover:text-blue-800 ml-1 transition-colors"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;