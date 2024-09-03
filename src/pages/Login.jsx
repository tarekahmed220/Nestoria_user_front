import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userloginApi from "../apis/userloginApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState("");
  const [success, setSuccess] = useState('');
  const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@#$%*]).{8,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Email is invalid';
        }
        break;
        
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (!passwordRegex.test(value)) {
          error = 'Password must include upper, lower, digit, and special character from @ # % $';
        }
        
        break;
        default:
          break;}
    
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    Object.keys(user).forEach((key) => {
      const error = validateField(key, user[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
console.log('Form submitted:', user, newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const { data: user2 } = await userloginApi.createUser(user);
        const token = user2?.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user2?.data?.user?.role);
        navigate('/');
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          if(error.response.status===401)
        {setSuccess('Check your email to verify your account.');}
          setServerErr(error.response.data.message);
          // toast.error(serverErr);
          
          console.log(error.response.data);
        } else {
          setServerErr('Something went wrong. Please try again later.');
        }
      }
    } else {
      setServerErr('Please fix the errors in the form.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
        <p className="text-red-500 text-md mt-2">{serverErr}</p>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="email">
              Email 
            </label>
            <input
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-orange-500'
              }`}
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-500' : 'focus:ring-orange-500'
                }`}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onBlur={handleBlur}
                placeholder="*"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
        
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="text-center mt-6">
            <a
              className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-600"
              href="#"
            >
              Lost your password?
            </a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;