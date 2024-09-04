
import React ,{useState} from 'react'
import InputField from '../components/Input';
import axios from 'axios';
function ForgotPassword() {
    const [user, setUser] = useState({
        email: '',
        
      });
    
      const [errors, setErrors] = useState({});
      
      const [serverErr, setServerErr] = useState("");
      const [success, setSuccess] = useState('');
      
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
            const {data:user2} =await axios.post('http://localhost:5000/api/v1/fur/auth/forgotpassword',
                 user,{
                    headers:{'Content-Type': 'application/json'}
                });

            console.log(user2);
            localStorage.setItem('token', user2.token);
            setSuccess('Check your email to change your password.');
          } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
             
              setServerErr(error.response.data.message);
              // toast.error(serverErr);
              
              console.log(error.response.data.message);
            } else {
              setServerErr('Something went wrong. Please try again later.');
            }
          }
        } else {
          setServerErr('Please fix the error');
        }
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-[#171716]">
          <div className="bg-black p-10 rounded-xl shadow-xl w-full max-w-xl mx-auto">
            <h2 className="text-white text-3xl font-200 mb-6 text-center font-['Segoe UI']">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
            <p className="text-red-500 text-xl mt-2 mx-auto text-center bg-gray-200">{serverErr}</p>
            <p className="text-green-500 text-md mt-2 text-center">{success}</p>
           <p className="text-gray-400 text-md mt-2 text-center"> Enter your email address and we will send you an email to reset your password</p>
            <div className='h-[40px] mb-[40px] w-full'>
            
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
               
              <div className="flex items-center justify-center rounded-full border border-solid border-[#EA580C]">
              <button
                  className="w-full bg-black  hover:bg-orange-600 hover:text-white text-orange-500 font-bold py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  type="submit"
                >
                  Send Email
                </button>
              </div>
            
            </form>
            
          </div>
        </div>
      );
    }
    

export default ForgotPassword
