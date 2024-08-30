

// export default LoginForm;
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
  const navigate =useNavigate()
  
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{8,30}$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { email, password } = user;
    let newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }else if(!passwordRegex.test(password)){
      newErrors.password = "invalid  ,Password must include upper, lower, digit, and special character from  @ # % $ ";
    }
   

    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    console.log('Form submitted:', user ,validationErrors);
    if ( !validationErrors.email && !validationErrors.password) {
      // setIsSubmitted(true);
      
      console.log('Form submitted:', user);
      try{
                const { data: user2 } = await userloginApi.createUser(user)
                    // .then((res)=>{console.log(res.data.msg)})
                    
                    console.log(user2);//res
                    const token =user2.token
                     localStorage.setItem("token",token)
                     localStorage.setItem("role",user2.data.user.role)
                    // console.log(mytoken);//res
                    navigate('/'); // Assuming you want to navigate to home after successful signup
                }
                catch (error) {
                    setErrors(error)
                     if (error.response && error.response.status >= 400 && error.response.status < 500) {
                    toast.error(error.response.data);
                    return errors
                 }
                }
            }
           
       else {
        
      toast.error('email and password are required. Please fix the errors in the form.');
      return errors
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="email">
              Username or Email Address
            </label>
            <input
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-orange-500'
              }`}
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="enter email"
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
                onChange={handleChange}
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

/////