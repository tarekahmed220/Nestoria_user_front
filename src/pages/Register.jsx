import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import userApi from "../apis/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    address: "",
    role: "",
    passwordConfirm: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  // const navigate =useNavigate()

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@%$#*]).{8,30}$/;
  const regexName = /^[a-zA-Z][a-zA-Z ]{1,29}$/;
  const regexPhone = /^01[0125][0-9]{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { fullName, phone, address, role, email, password, passwordConfirm } =
      user;
    let newErrors = {};
    if (!fullName) {
      newErrors.fullName = "fullName is required";
    } else if (!regexName.test(fullName)) {
      newErrors.fullName = "fullName is invalid";
    }
    if (!address) {
      newErrors.address = "address is required";
    }
    if (!role) {
      newErrors.role = "role is required";
    }
    if (!phone) {
      newErrors.phone = "phone is required";
    } else if (!regexPhone.test(phone)) {
      newErrors.phone = "phone is invalid";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "invalid  ,Password must include upper, lower, digit, and special character from  @ # % $ ";
    }
    if (!passwordConfirm) {
      newErrors.passwordConfirm = "passwordConfirm is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordConfirm !== password) {
      newErrors.password = "invalid  ,passwordConfirm must be same as password";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    console.log("Form submitted:", user, validationErrors);
    if (
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.fullName &&
      !validationErrors.phone &&
      !validationErrors.address &&
      !validationErrors.passwordConfirm &&
      !validationErrors.role
    ) {
      // setIsSubmitted(true);

      console.log("Form submitted:", user);
      try {
        const { data: user2 } = await userApi.createUser(user);
        // .then((res)=>{console.log(res.data.msg)})

        console.log(user2); //res
        toast.success("go to your email ,please. and virify it to can login");

        // console.log(mytoken);//res
        //  navigate('/'); // Assuming you want to navigate to home after successful signup
      } catch (error) {
        setErrors(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data);
          return errors;
        }
      }
    } else {
      toast.error("Please fix the errors in the form.");
      return errors;
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.fullName ? "focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              id="fullName"
              name="fullName"
              type="text"
              value={user.fullName}
              onChange={handleChange}
              placeholder="enter your Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="address"
            >
              address
            </label>
            <select
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Select Address *
              </option>
              <option value="England">England</option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            {errors.address && (
              <p className="text-red-500 text-sm mt-2">{errors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="role"
            >
              role
            </label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-700 text-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>
                Select role *
              </option>
              <option value="client">Client</option>
              <option value="workshop">Workshop</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-2">{errors.role}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.phone ? "focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              id="phone"
              name="phone"
              type="text"
              value={user.phone}
              onChange={handleChange}
              placeholder="enter your Phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-orange-500"
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
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-orange-500"
                }`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                placeholder="*"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-medium mb-2"
              htmlFor="passwordConfirm"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 ${
                  errors.passwordConfirm
                    ? "focus:ring-red-500"
                    : "focus:ring-orange-500"
                }`}
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPassword ? "text" : "password"}
                value={user.passwordConfirm}
                onChange={handleChange}
                placeholder="*"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-2">
                {errors.passwordConfirm}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="text-center mt-6">
            <a
              className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-600"
              href="/login"
            >
              already have an account, Login?
            </a>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;

/////
