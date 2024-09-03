
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../apis/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [user, setUser] = useState({
    fullName: '',
    phone: '',
    address: '',
    role: '',
    passwordConfirm: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState('');
  const [success, setSuccess] = useState('');

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%*]).{8,30}$/;
  const regexName = /^[a-zA-Z][a-zA-Z ]{2,30}$/;
  const regexPhone = /^01[0125][0-9]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value) {
          error = 'Full name is required';
        } else if (!regexName.test(value)) {
          error = 'Full name is invalid';
        }
        break;
      case 'address':
        if (!value) {
          error = 'Address is required';
        }
        break;
      case 'role':
        if (!value) {
          error = 'Role is required';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone is required';
        } else if (!regexPhone.test(value)) {
          error = 'Phone is invalid';
        }
        break;
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
      case 'passwordConfirm':
        if (!value) {
          error = 'Password confirmation is required';
        } else if (value !== user.password) {
          error = 'Password confirmation must match the password';
        }
        break;
      default:
        break;
    }

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
        const { data: user2 } = await userApi.createUser(user);
        console.log(user2.token);
        localStorage.setItem('token', user2.token);
        setSuccess('Check your email to verify your account.');
          navigate('/login');
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          setServerErr(error.response.data.message);
          // console.log(error.response.data.message);
        } else {
          console.log(error);
          toast.error('Something went wrong. Please try again later.');
         
        }
      }
    } else {
      setServerErr('Please fix the errors in the form.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 py-5">
      <div className="bg-black p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
        <span className="text-green-500 text-sm mt-2">{success} </span>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-medium mb-2 mx-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.fullName ? 'focus:ring-red-500' : 'focus:ring-orange-500'
              }`}
              id="fullName"
              name="fullName"
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              onBlur={handleBlur}
              placeholder="Full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
          </div>
          <div className='container mx-auto flex justify-start items-end'>
            
          <div className="mb-4 mx-auto">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full  py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-orange-500'
              }`}
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onBlur={handleBlur}
              placeholder="Email*"
            />
            {errors.email && <p className="text-red-500 text-md mt-2">{errors.email}</p>}
          </div>
         
          <div className="mb-4 mx-auto">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="role">
              Role
            </label>
            <select
              name="role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              onBlur={handleBlur}
              className="w-full p-3 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                 Role*
              </option>
              <option value="client">Client</option>
              <option value="workshop">Workshop</option>
            </select>
            {errors.role && <p className="text-red-500 text-md mt-2">{errors.role}</p>}
          </div>
          </div>
          <div className='container mx-auto flex '>
          <div className="mb-4 mx-auto">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="phone">
              Phone*
            </label>
            <input
              className={`w-full  py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.phone ? 'focus:ring-red-500' : 'focus:ring-orange-500'
              }`}
              id="phone"
              name="phone"
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              onBlur={handleBlur}
              placeholder="phone number"
            />
            {errors.phone && <p className="text-red-500 text-md mt-2">{errors.phone}</p>}
          </div>
          <div className="mb-4 mx-auto">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="address">
              Address
            </label>
            <select
              name="address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              onBlur={handleBlur}
              className="w-full p-3 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                 Address*
              </option>
              <option value="England">England</option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address}</p>}
          </div>

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
                placeholder=" password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-md mt-2">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-medium mb-2" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                  errors.passwordConfirm ? 'focus:ring-red-500' : 'focus:ring-orange-500'
                }`}
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPassword ? 'text' : 'password'}
                value={user.passwordConfirm}
                onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
                onBlur={handleBlur}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.passwordConfirm && <p className="text-red-500 text-md mt-2">{errors.passwordConfirm}</p>}
          </div>

<p className="text-red-500 text-md mt-2 text-center">{serverErr}</p>
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-6">
        <span   className="inline-block align-baseline font-bold text-sm text-gray-100 "> Already have an account ? </span> 
            <a
              className="inline-block align-baseline font-bold text-md text-orange-500 hover:text-orange-700"
              href="/login"
            >
            Login
            </a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
