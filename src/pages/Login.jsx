import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userloginApi from "../apis/userloginApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash } from "react-icons/fa";
import InputField from "../components/Input";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState("");
  const [success, setSuccess] = useState("");
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{8,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Email is invalid";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!passwordRegex.test(value)) {
          error =
            "Password must include upper, lower, digit, and special character from @ # % $";

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
    console.log("Form submitted:", user, newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const { data: user2 } = await userloginApi.createUser(user);
        const token = user2?.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user2?.data?.user?.role);
        navigate("/");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.status === 401) {
            setSuccess("Check your email to verify your account.");
          }
          setServerErr(error.response.data.message);
          // toast.error(serverErr);

          console.log(error.response.data);
        } else {
          setServerErr("Something went wrong. Please try again later.");
        }
      }
    } else {
      setServerErr("Please fix the errors in the form.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#171716]">
      <div className="bg-black p-10 rounded-xl shadow-xl w-full max-w-xl mx-auto">
        <h2 className="text-white text-3xl font-200 mb-6 text-center font-['Segoe UI']">
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
          <p className="text-red-500 text-md mt-2">{serverErr}</p>
          <label
            className="block text-gray-400 text-sm font-medium mb-2"
            htmlFor="email"
          >
            User Email
          </label>
          <div className="h-[40px] mb-[40px] w-full">
            <InputField
              id="email"
              name="email"
              type="email"
              value={user.email}
              placeholder="please Enter your Email*"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              onBlur={handleBlur}
              error={errors.email}
            />
          </div>
          <label
            className="block text-gray-400 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Password
          </label>
          <div className="h-[40px] mb-[40px] w-full">
            <div className="mb-6">
              <div className="relative">
                <input
                  style={{ border: "1px solid #A5A5A5" }}
                  className={`w-full px-4 py-3 bg-black text-white text-sm rounded-full focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-500 border-red-500 "
                      : "focus:ring-orange-500 border-orange-500"
                  }`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  onBlur={handleBlur}
                  placeholder="Enter your password*"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center rounded-full border border-solid border-[#EA580C]">
            <button
              className="w-full bg-black  hover:bg-orange-600 hover:text-white text-orange-500 font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="text-center mt-6">
            <Link
              className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-600"
              to="/forgotpassword"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
